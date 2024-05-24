import test, { expect } from "@playwright/test";
import { Homepage } from "../pages/Homepage";
import { CartPage } from "../pages/CartPage";

test("Adds a product, changes product quantity and verifies cart count", async({page}) => {
    const homepage = new Homepage(page);
    const cartPage = new CartPage(page);
    await homepage.openHomepageAndVerify();
    await homepage.addProduct();
    await homepage.clickCartHeader();
    await page.reload();
    const cartCountBefore = await cartPage.getProductQuantity();
    await cartPage.changeProductQuantity();
    await cartPage.clickUpdateCartButton();
    await page.reload();
    await page.reload();
    const cartCountAfter = await cartPage.getProductQuantity();
    await expect(cartCountAfter).toBeGreaterThan(cartCountBefore);
})