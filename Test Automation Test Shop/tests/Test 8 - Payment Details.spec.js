import test, { expect } from "@playwright/test";
import { Homepage } from "../pages/Homepage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { expectedEmptyErrorMessage, expectedIncorrectCartMessage } from "../lib/text";

test("Fills empty Payment Details and verifies error message", async({page}) => {
    const homepage = new Homepage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    await homepage.openHomepageAndVerify();
    await homepage.addProduct();
    await homepage.clickCartHeader();
    await page.reload();
    await cartPage.clickCheckoutButton();
    await checkoutPage.clickPlaceOrderButton();
    const p = await checkoutPage.errorMessage.innerText();
    await expect(p).toContain(expectedEmptyErrorMessage);
})
test("Fills incorrect Payment Details and verifies error message", async({page}) => {
    const homepage = new Homepage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const incorrectData = "1111";
    await homepage.openHomepageAndVerify();
    await homepage.addProduct();
    await homepage.clickCartHeader();
    await page.reload();
    await cartPage.clickCheckoutButton();
    await checkoutPage.fillsIncorrectPaymentData(incorrectData);
    await checkoutPage.clickPlaceOrderButton();
    const p = await checkoutPage.errorMessage.innerText();
    await expect(p).toContain(expectedIncorrectCartMessage);
})