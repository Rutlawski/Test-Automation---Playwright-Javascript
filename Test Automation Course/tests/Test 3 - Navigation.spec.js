import test, { expect } from "@playwright/test";
import { HomePage } from "../pages/Homepage";
import { loginUrl, cartUrl } from "../lib/links";

test("Navigates to various pages and verifies URL", async({page}) => {
    const homePage = new HomePage(page);
    await homePage.openHomepageAndVerify();
    await homePage.clickNavigationTab(0);
    await expect(page).toHaveURL(loginUrl);
    await homePage.clickNavigationTab(2);
    await expect(page).toHaveURL(cartUrl);
})