import test, { expect } from "@playwright/test";
import { Homepage } from "../pages/Homepage";
import { homepageTitle } from "../lib/text";

test("Opens Homepage and verifies title", async({page}) => {
    const homepage = new Homepage(page);
    await homepage.openHomepage();
    await expect(page).toHaveTitle(homepageTitle);
})