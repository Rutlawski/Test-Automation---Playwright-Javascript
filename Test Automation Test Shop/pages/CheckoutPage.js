import { paymentData } from "../lib/paymentData";

export class CheckoutPage{
        /**
 *
 * @param {import("@playwright/test").Page} page
 */
    constructor(page){
        this.page = page;
        this.firstNameInput = page.locator('[id="billing_first_name"]');
        this.lastNameInput = page.locator('[id="billing_last_name"]');
        this.countryDropdown = page.locator('[id="select2-billing_country-container"]');
        this.adressInput = page.locator('[id="billing_address_1"]');
        this.postCodeInput = page.locator('[id="billing_postcode"]');
        this.cityInput = page.locator('[id="billing_city"]');
        this.phoneInput = page.locator('[id="billing_phone"]');
        this.mailInput = page.locator('[id="billing_email"]');
        this.radioButton = page.locator('[id="payment_method_cod"]');
        this.placeOrderButton = page.locator('[id="place_order"]');
        this.errorMessage = page.locator('[class="woocommerce-error"]');
        this.headerMessage = page.locator('[class="page-title margin-top"]');
    }
    fillsIncorrectPaymentData = async(string) => {
        await this.firstNameInput.waitFor();
        await this.firstNameInput.fill(string);
        await this.lastNameInput.waitFor();
        await this.lastNameInput.fill(string);
        await this.adressInput.waitFor();
        await this.adressInput.fill(string);
        await this.postCodeInput.waitFor();
        await this.postCodeInput.fill(string);
        await this.cityInput.waitFor();
        await this.cityInput.fill(string);
        await this.phoneInput.waitFor();
        await this.phoneInput.fill(string);
        await this.mailInput.waitFor();
        await this.mailInput.fill(string);
    }
    fillsCorrectPaymentData = async(paymentData) => {
        await this.firstNameInput.waitFor();
        await this.firstNameInput.fill(paymentData.firstName);
        await this.lastNameInput.waitFor();
        await this.lastNameInput.fill((paymentData.lastName));
        await this.adressInput.waitFor();
        await this.adressInput.fill((paymentData.streetAdress));
        await this.postCodeInput.waitFor();
        await this.postCodeInput.fill((paymentData.postCode));
        await this.cityInput.waitFor();
        await this.cityInput.fill((paymentData.city));
        await this.phoneInput.waitFor();
        await this.phoneInput.fill((paymentData.phone));
        await this.mailInput.waitFor();
        await this.mailInput.fill((paymentData.mailAdress));
    }
    chooseRadioButton = async() => {
        await this.radioButton.waitFor();
        await this.radioButton.click();
    }
    clickPlaceOrderButton = async() => {
        await this.placeOrderButton.waitFor();
        await this.placeOrderButton.click();
    }
}