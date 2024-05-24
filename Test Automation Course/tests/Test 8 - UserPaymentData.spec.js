import test, { expect } from "@playwright/test";
import { HomePage } from "../pages/Homepage";
import { CartPage } from "../pages/CartPage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { PaymentDataPage } from "../pages/PaymentDataPage";
import { v4 as uuid } from "uuid";
import { userPaymentData } from "../data/userPaymentData";
import { expectedEmptyErrorMessage, expectedIncorrectErrorMessage } from "../lib/text";

test("Fills correct User Payment Data, continues and verifies URL", async({page}) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);
    const paymentDataPage = new PaymentDataPage(page);
    const mail = await uuid() + "@gmail.com";
    const password = await uuid();
    await homePage.openHomepage();
    await homePage.addProductToCart();
    await homePage.clickNavigationTab(2);
    await cartPage.clickContinueToCheckout();
    await loginPage.clickRegisterButton();
    await registerPage.fillCredentialInputs(mail, password);
    await registerPage.clickRegisterButton();
    await paymentDataPage.fillPaymentDetails(userPaymentData);
    await paymentDataPage.clickContinueToPayment();
    await expect(page).toHaveURL("/payment");
})
test("Leaves user payment data empty, clicks on button and verifies error message", async({page}) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);
    const paymentDataPage = new PaymentDataPage(page);
    const mail = uuid() + "@gmail.com";
    const password = uuid();
    await homePage.openHomepage();
    await homePage.addProductToCart();
    await homePage.clickNavigationTab(2);
    await cartPage.clickContinueToCheckout();
    await loginPage.clickRegisterButton();
    await registerPage.fillCredentialInputs(mail, password);
    await registerPage.clickRegisterButton();
    await paymentDataPage.clickContinueToPayment();
    const emptyErrorMessage = await paymentDataPage.errorMessage.innerText();
    await expect(emptyErrorMessage).toBe(expectedEmptyErrorMessage);
})
test("Fills inorrect User Payment Data, continues and verifies error message", async({page}) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);
    const paymentDataPage = new PaymentDataPage(page);
    const mail = uuid() + "@gmail.com";
    const password = uuid();
    await homePage.openHomepage();
    await homePage.addProductToCart();
    await homePage.clickNavigationTab(2);
    await cartPage.clickContinueToCheckout();
    await loginPage.clickRegisterButton();
    await registerPage.fillCredentialInputs(mail, password);
    await registerPage.clickRegisterButton();
    await paymentDataPage.fillIncorrectPaymentDetails();
    await paymentDataPage.clickContinueToPayment();
    const incorrectErrorMessage = await paymentDataPage.errorMessage.innerText();
    await expect(incorrectErrorMessage).toBe(expectedIncorrectErrorMessage);
})
test("Fills correct user payment data and saves it", async({page}) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);
    const paymentDataPage = new PaymentDataPage(page);
    const mail = await uuid() + "@gmail.com";
    const password = await uuid();
    await homePage.openHomepage();
    await homePage.addProductToCart();
    await homePage.clickNavigationTab(2);
    await cartPage.clickContinueToCheckout();
    await loginPage.clickRegisterButton();
    await registerPage.fillCredentialInputs(mail, password);
    await registerPage.clickRegisterButton();
    await paymentDataPage.fillPaymentDetails(userPaymentData);
    await paymentDataPage.clickSaveAdressButton();
    await paymentDataPage.isAdressContainerVisible();
})