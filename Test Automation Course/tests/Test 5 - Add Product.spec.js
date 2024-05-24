import test, { expect } from "@playwright/test";
import { HomePage } from "../pages/Homepage";

test("Adds a product to cart and verifies cart count", async({page}) => {
    const homePage = new HomePage(page);
    await homePage.openHomepageAndVerify();
    await homePage.addProductToCart();
    await expect(homePage.cartCount).toHaveText("1");
})
test("Adds a product to cart and verifies text on button", async({page}) => {
    const homePage = new HomePage(page);
    await homePage.openHomepageAndVerify();
    await expect(homePage.addToBasketButton).toHaveText("Add to Basket");
    await homePage.addProductToCart();
    await expect(homePage.addToBasketButton).toHaveText("Remove from Basket");
})