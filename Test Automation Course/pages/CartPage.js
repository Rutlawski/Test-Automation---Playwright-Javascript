import { expect } from "@playwright/test";

export class CartPage{
        /**
     *
     * @param {import("@playwright/test").Page} page
     */
    constructor(page){
        this.page = page;
        this.cartHeader = page.locator('[data-qa="header-basket-count"]');
        this.removeProductButton = page.locator('[data-qa="basket-card-remove-item"]');
        this.continueToCheckoutButton = page.locator('[data-qa="continue-to-checkout"]');
        this.productCards = page.locator('[data-qa="basket-card"]');
        this.productPrices = page.locator('[data-qa="basket-item-price"]');
    }
    removeProductFromCart = async() => {
        const removeProductButtonElement = this.removeProductButton;
        await removeProductButtonElement.waitFor();
        await removeProductButtonElement.click();
    }
    removeCheapestProductFromCart = async() => {
        await this.productCards.first().waitFor();
        await this.productPrices.first().waitFor();
        const productCardsCountBefore = await this.productCards.count();
        const productPricesText = await this.productPrices.allInnerTexts();
        const productPricesNumber = await productPricesText.map((element) => {
            const withoutDollar = element.replace("$", "");
            return parseInt(withoutDollar, 10);
        })
        const smallestPrice = Math.min(...productPricesNumber);
        const smallestPriceIndex = productPricesNumber.indexOf(smallestPrice);
        const specificRemoveButton = await this.removeProductButton.nth(smallestPriceIndex);
        await specificRemoveButton.waitFor();
        await specificRemoveButton.click();
        await expect(await this.productCards).toHaveCount(productCardsCountBefore - 1);
        }
    getCartHeaderNumber = async() => {
        await this.cartHeader.waitFor();
        const text = await this.cartHeader.innerText();
        return await parseInt(text, 10);
    }
    clickContinueToCheckout = async() => {
        const continueToCheckoutButtonElement = await this.continueToCheckoutButton;
        await continueToCheckoutButtonElement.waitFor();
        await continueToCheckoutButtonElement.click();
    }
}