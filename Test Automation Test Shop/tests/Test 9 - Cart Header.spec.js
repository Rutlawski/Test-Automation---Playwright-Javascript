import test, { expect } from "@playwright/test";
import { Homepage } from "../pages/Homepage";

test("Verifies functionality of the cart header", async({page}) => {
    const homepage = new Homepage(page);
    await homepage.openHomepageAndVerify();
    const cartHeaderBefore = await homepage.getCartHeaderNumber();
    await homepage.addProduct();
    await homepage.clickGenericShopButton();
    await page.reload();
    const cartHeaderAfter = await homepage.getCartHeaderNumber();
    await expect(cartHeaderAfter).toBeGreaterThan(cartHeaderBefore);
})