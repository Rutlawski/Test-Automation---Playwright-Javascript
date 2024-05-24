import { expect } from "@playwright/test";

export class LoginPage{
        /**
     *
     * @param {import("@playwright/test").Page} page
     */
    constructor(page){
        this.page = page;
        this.registerButton = page.locator('[data-qa="go-to-signup-button"]');
        this.loggedHeader = page.locator('//h1[contains(text(), "My Account")]');
        this.networkError = page.locator('[data-qa="error-message"]');
    }
    openLoginPage = async() => {
        await this.page.goto("/my-account");
    }
    clickRegisterButton = async() => {
        const registerButtonElement = await this.registerButton;
        await registerButtonElement.waitFor();
        await registerButtonElement.click();
    }
    isHeaderVisible = async() => {
        await this.loggedHeader.waitFor();
    }
}