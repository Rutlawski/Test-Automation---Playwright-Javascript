import test, { expect } from "@playwright/test";
import { Homepage } from "../pages/Homepage";
import { CartPage } from "../pages/CartPage";
import { expectedEmptyCartMessage } from "../lib/text";

test("Adds and removes product from cart", async({page}) => {
    const homepage = new Homepage(page);
    const cartPage = new CartPage(page);
    await homepage.openHomepageAndVerify();
    await homepage.addProduct();
    await homepage.clickCartHeader();
    await page.reload();
    await cartPage.removeProduct();
    await cartPage.clickUpdateCartButton();
    await expect(cartPage.emptyCartMessage).toHaveText(expectedEmptyCartMessage);
})