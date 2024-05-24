import test, { expect } from "@playwright/test";
import { Homepage } from "../pages/Homepage";
import { incorrectSearchPhrase, searchPhrase } from "../lib/text";
import { SearchPage } from "../pages/SearchPage";

test("Fills search input with a phrase and verifies results", async({page}) => {
    const homepage = new Homepage(page);
    const searchPage = new SearchPage(page);
    await homepage.openHomepageAndVerify();
    await homepage.fillSearchInput(searchPhrase);
    await homepage.clickSearchButton();
    await expect(searchPage.productCards).toHaveCount(2);
})
test("Fills search input with an incorrect phrase and verifies result", async({page}) => {
    const homepage = new Homepage(page);
    const searchPage = new SearchPage(page);
    await homepage.openHomepageAndVerify();
    await homepage.fillSearchInput(incorrectSearchPhrase);
    await homepage.clickSearchButton();
    await expect(searchPage.incorrectSearchHeader).toHaveText("Nothing Found");
})