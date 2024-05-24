import test, { expect } from "@playwright/test";
import { v4 as uuid } from "uuid";
import { MyAccountPage } from "../pages/MyAccountPage";
import { expectedLoggedInMessage } from "../lib/text";

test("Registers a user and verifies", async({page}) => {
    const myAccountPage = new MyAccountPage(page);
    const mail = uuid() + "@gmail.com";
    const password = uuid();
    await myAccountPage.openMyAccountPage();
    await myAccountPage.fillCredentials(mail, password);
    await page.waitForLoadState('networkidle');
    await myAccountPage.clickRegisterButton();
    await myAccountPage.clickRegisterButton();
    await expect(await myAccountPage.loggedInMessage).toHaveText(expectedLoggedInMessage);
})