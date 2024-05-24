import test, { expect } from "@playwright/test";
import { Homepage } from "../pages/Homepage";
import { CartPage } from "../pages/CartPage";
import { cartHeaderTextWithOneProduct } from "../lib/text";

test("Adds a product to cart and verifies cart count", async({page}) => {
    const homepage = new Homepage(page);
    const cartPage = new CartPage(page);
    await homepage.openHomepageAndVerify();
    await homepage.scrollTo();
    await homepage.addProduct();
    await homepage.clickCartHeader();
    await page.reload();
    const cartHeaderNumber = await cartPage.getProductQuantity();
    await expect(cartHeaderNumber).toBe(35);
})