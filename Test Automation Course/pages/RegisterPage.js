import { registerPageUrl } from "../lib/links";

export class RegisterPage{
        /**
     *
     * @param {import("@playwright/test").Page} page
     */
    constructor(page){
        this.page = page;
        this.mailInput = page.getByPlaceholder('E-Mail');
        this.passwordInput = page.getByPlaceholder('Password');
        this.registerButton = page.locator('[type="submit"]')
    }
    openRegisterPage = async() => {
        await this.page.goto(registerPageUrl);
    }
    fillCredentialInputs = async(mail, password) => {
        await this.mailInput.waitFor();
        await this.mailInput.fill(mail);
        await this.passwordInput.waitFor();
        await this.passwordInput.fill(password);
    }
    clickRegisterButton = async() => {
        await this.registerButton.waitFor();
        await this.registerButton.click();
    }
}