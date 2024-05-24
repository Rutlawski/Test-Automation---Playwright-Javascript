import test, { expect } from "@playwright/test";
import { HomePage } from "../pages/Homepage";
import { homePageTitle } from "../lib/text";

test("Opens Homepage and verifies Title", async({page}) => {
    const homePage = new HomePage(page);
    await homePage.openHomepage();
    await expect(page).toHaveTitle(homePageTitle);
})