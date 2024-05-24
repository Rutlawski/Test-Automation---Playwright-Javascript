import { userPaymentData } from "../data/userPaymentData";

export class PaymentDataPage{
            /**
     *
     * @param {import("@playwright/test").Page} page
     */
    constructor(page){
        this.page = page;
        this.nameInput = page.locator('[data-qa="delivery-first-name"]');
        this.lastNameInput = page.locator('[data-qa="delivery-last-name"]');
        this.streetInput = page.locator('[data-qa="delivery-address-street"]');
        this.postCodeInput = page.locator('[data-qa="delivery-postcode"]');
        this.cityInput = page.locator('[data-qa="delivery-city"]');
        this.countryDropdown = page.locator('[data-qa="country-dropdown"]');
        this.continueToPaymentButton = page.locator('[data-qa="continue-to-payment-button"]');
        this.errorMessage = page.locator('[data-qa="error-message"]');
        this.saveAdressButton = page.locator('[data-qa="save-address-button"]');
        this.savedAdress = page.locator('[data-qa="saved-address-container"]');
    }
    fillPaymentDetails = async() => {
        await this.nameInput.waitFor();
        await this.nameInput.fill(userPaymentData.name);
        await this.lastNameInput.waitFor();
        await this.lastNameInput.fill(userPaymentData.lastName);
        await this.streetInput.waitFor();
        await this.streetInput.fill(userPaymentData.street);
        await this.postCodeInput.waitFor();
        await this.postCodeInput.fill(userPaymentData.postCode);
        await this.cityInput.waitFor();
        await this.cityInput.fill(userPaymentData.city);
        await this.countryDropdown.waitFor();
        await this.countryDropdown.selectOption("Poland");
    }
    fillIncorrectPaymentDetails = async() => {
        await this.nameInput.waitFor();
        await this.nameInput.fill("111111111");
    }
    clickContinueToPayment = async() => {
        const continueToPaymentButtonElement = await this.continueToPaymentButton;
        await continueToPaymentButtonElement.waitFor();
        await continueToPaymentButtonElement.click();
    }
    clickSaveAdressButton = async() => {
        await this.saveAdressButton.waitFor();
        await this.saveAdressButton.click();
    }
    isAdressContainerVisible = async() => {
        await this.savedAdress.waitFor();
    }
}