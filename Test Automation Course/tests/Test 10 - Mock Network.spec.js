import test, { expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { getLoginToken } from "../api-calls/getLoginToken";
import { adminDetails } from "../data/adminDetails";
import { networkErrorMessage } from "../lib/text";

test("Mocking network requests", async({page}) => {
    const loginPage = new LoginPage(page);
    const loginToken = await getLoginToken(adminDetails.username, adminDetails.password);
    await page.route("**/api/user**", async(route, request) => {
        await route.fulfill({
            status: 500,
            contentType: "application/json",
            body: JSON.stringify({message: "A critical error has occured"})
        })
    });
    await loginPage.openLoginPage();
    await page.evaluate((loginTokenInsideBrowser) => {
        document.cookie = "token= " + loginTokenInsideBrowser
    }, [loginToken]);
    await loginPage.openLoginPage();
    await expect(await loginPage.networkError).toHaveText(networkErrorMessage);
})