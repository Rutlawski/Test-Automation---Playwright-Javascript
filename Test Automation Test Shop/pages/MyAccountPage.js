export class MyAccountPage{
        /**
 *
 * @param {import("@playwright/test").Page} page
 */
    constructor(page){
        this.page = page;
        this.mailInput = page.locator('[id="reg_email"]');
        this.passwordInput = page.locator('[id="reg_password"]');
        this.registerButton = page.locator('//input[@name="register"]');
        this.loggedInMessage = page.locator('//p[contains(text(), "From your account dashboard you can view your")]');
    }
    openMyAccountPage = async() => {
        await this.page.goto("/my-account/");
    }
    fillCredentials = async(mail, password) => {
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