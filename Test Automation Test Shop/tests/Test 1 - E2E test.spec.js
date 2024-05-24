import test, { expect } from "@playwright/test";
import { Homepage } from "../pages/Homepage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { MyAccountPage } from "../pages/MyAccountPage";
import { v4 as uuid } from "uuid";
import { paymentData } from "../lib/paymentData";
import { expectedOrderecievedMessage } from "../lib/text";

test("E2E Test - A full user journey", async({page}) => {
    const homepage = new Homepage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const myAccountPage = new MyAccountPage(page);
    const mail = uuid() + "@gmail.com";
    const password = uuid();
    await homepage.openHomepageAndVerify();
    await homepage.clickMyAccountButton();
    await myAccountPage.fillCredentials(mail, password);
    await page.waitForLoadState('networkidle');
    await myAccountPage.clickRegisterButton();
    await homepage.clickGenericShopButton();
    await homepage.addProduct();
    await homepage.clickCartHeader()
    await page.reload();
    await cartPage.changeProductQuantity()
    await cartPage.clickCheckoutButton();
    await checkoutPage.fillsCorrectPaymentData(paymentData);
    await checkoutPage.chooseRadioButton();
    await checkoutPage.clickPlaceOrderButton();
    await expect(await checkoutPage.headerMessage).toHaveText(expectedOrderecievedMessage);
})