export class CartPage{
    /**
 *
 * @param {import("@playwright/test").Page} page
 */
    constructor(page){
        this.page = page;
        this.totalPrice = page.locator('[data-title="Total"]').first();
        this.minusButton = page.locator('[class="dashicons dashicons-minus"]');
        this.plusButton = page.locator('[class="dashicons dashicons-plus"]');
        this.updateCartButton = page.locator('//input[@name="update_cart"]');
        this.emptyCartMessage = page.locator('[class="cart-empty"]');
        this.checkoutButton = page.locator('[class="checkout-button button alt wc-forward"]');
    }
    getCartHeaderNumber = async() => {
        await this.cartHeader.waitFor();
        const cartHeaderText = await this.cartHeader.innerText();
        const withoutText = cartHeaderText.replace("My cart - zł", "");
        return parseInt(withoutText, 10);
    }
    getProductQuantity = async() => {
        await this.totalPrice.waitFor();
        const totalPriceText = await this.totalPrice.innerText();
        return parseInt(totalPriceText, 10);
    }
    changeProductQuantity = async() => {
        await this.plusButton.waitFor();
        await this.plusButton.click();
    }
    removeProduct = async() => {
        await this.minusButton.waitFor();
        await this.minusButton.click();
    }
    clickUpdateCartButton = async() => {
        await this.updateCartButton.waitFor();
        await this.updateCartButton.click();
    }
    clickCheckoutButton = async() => {
        await this.checkoutButton.waitFor();
        await this.checkoutButton.click();
    }
}