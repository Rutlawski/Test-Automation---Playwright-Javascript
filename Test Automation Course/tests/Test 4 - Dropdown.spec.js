import test, { expect } from "@playwright/test";
import { HomePage } from "../pages/Homepage";

test("Selects various values on dropdown and verifies results", async({page}) => {
    const homePage = new HomePage(page);
    await homePage.openHomepageAndVerify();
    await homePage.setDropdownValueAsc();
    await expect(homePage.dropdown).toHaveValue("price-asc");
    await expect(homePage.productCard).toHaveText("Baby Zebra with butterfly");
    await homePage.setDropdownValueDefault();
    await expect(homePage.dropdown).toHaveValue("default");
    await expect(homePage.productCard).toHaveText("Astronaut dabbing");
})