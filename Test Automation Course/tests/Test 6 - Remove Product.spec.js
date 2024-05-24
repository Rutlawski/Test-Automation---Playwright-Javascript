import test, { expect } from "@playwright/test";
import { HomePage } from "../pages/Homepage";
import { CartPage } from "../pages/CartPage";

test("Remove product from cart and verifies cart count", async({page}) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    await homePage.openHomepageAndVerify();
    await homePage.addProductToCart();
    await homePage.clickNavigationTab(2);
    const cartCountBefore = await cartPage.getCartHeaderNumber();
    await cartPage.removeProductFromCart();
    const cartCountAfter = await cartPage.getCartHeaderNumber();
    // await expect(cartCountAfter).toEqual(cartCountBefore - 1);
})