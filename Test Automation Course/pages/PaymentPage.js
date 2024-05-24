import { expect } from "@playwright/test";
import { creditCardDetails } from "../data/creditCardDetails";

export class PaymentPage{
            /**
     *
     * @param {import("@playwright/test").Page} page
     */
    constructor(page){
        this.page = page;
        this.totalPrice = page.locator('[data-qa="total-value"]');
        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]');
        this.discountCodeInput = page.locator('[data-qa="discount-code-input"]');
        this.submitDiscountButton = page.locator('[data-qa="submit-discount-button"]');
        this.totalPriceAfterDiscount = page.locator('[data-qa="total-with-discount-value"]');
        this.discountActivatedMessage = page.locator('[data-qa="discount-active-message"]');
        this.creditCardOwnerInput = page.locator('[data-qa="credit-card-owner"]');
        this.creditCardNumberInput = page.locator('[data-qa="credit-card-number"]');
        this.validUntilInput = page.locator('[data-qa="valid-until"]');
        this.cvcInput = page.locator('[data-qa="credit-card-cvc"]');
        this.payButton = page.locator('[data-qa="pay-button"]');
    }
    useDiscountCode = async() => {
        const discountCodeChar = await this.discountCode.innerText();
        await this.discountCodeInput.waitFor();
        await this.discountCodeInput.fill(discountCodeChar);
        await expect(await this.discountCodeInput).toHaveValue(discountCodeChar);
    }
    submitDiscount = async() => {
        const totalPriceBefore = await this.totalPrice.innerText();
        await this.submitDiscountButton.waitFor();
        await this.submitDiscountButton.click();
        await this.discountActivatedMessage.waitFor();
        const totalPriceAfter = await this.totalPriceAfterDiscount.innerText();
        await expect(await totalPriceAfter).not.toBe(totalPriceBefore);
    }
    fillCreditCardDetails = async() => {
        await this.creditCardOwnerInput.waitFor();
        await this.creditCardOwnerInput.fill(creditCardDetails.creditCardOwner);
        await this.creditCardNumberInput.waitFor();
        await this.creditCardNumberInput.fill(creditCardDetails.creditCardNumber);
        await this.validUntilInput.waitFor();
        await this.validUntilInput.fill(creditCardDetails.validUntil);
        await this.cvcInput.waitFor();
        await this.cvcInput.fill(creditCardDetails.cvc);
    }
    clickPayButton = async() => {
        await this.payButton.waitFor();
        await this.payButton.click();
    }
}