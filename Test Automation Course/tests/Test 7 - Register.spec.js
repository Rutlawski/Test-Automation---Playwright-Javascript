import test, { expect } from "@playwright/test";
import { RegisterPage } from "../pages/RegisterPage";
import { v4 as uuid } from "uuid";
import { HomePage } from "../pages/Homepage";
import { LoginPage } from "../pages/LoginPage";
import { myAccountUrl } from "../lib/links";

test("Registers with correct credentials and verifies", async({page}) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);
    const mail = await uuid() + "@gmail.com";
    const password = await uuid();
    await homePage.openHomepageAndVerify();
    await homePage.clickNavigationTab(0);
    await loginPage.clickRegisterButton();
    await registerPage.fillCredentialInputs(mail, password);
    await registerPage.clickRegisterButton();
    await expect(page).toHaveURL(myAccountUrl);
})