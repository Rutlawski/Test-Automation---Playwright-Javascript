import test from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { getLoginToken } from "../api-calls/getLoginToken";
import { adminDetails } from "../data/adminDetails";

test("Injects cookies into browser", async({page}) => {
    const loginPage = new LoginPage(page);
    const loginToken = await getLoginToken(adminDetails.username, adminDetails.password);
    await loginPage.openLoginPage();
    await page.evaluate((loginTokenInsideBrowser) => {
        document.cookie = "token= " + loginTokenInsideBrowser
    }, [loginToken]);
    await loginPage.openLoginPage();
    await loginPage.isHeaderVisible();
})