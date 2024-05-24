import { expect } from "@playwright/test";
import { homepageTitle } from "../lib/text";

export class Homepage{
/**
 *
 * @param {import("@playwright/test").Page} page
 */
    constructor(page){
        this.page = page;
        this.searchInput = page.locator('[id="search-field-top-bar"]');
        this.searchButton = page.locator('[id="search-top-bar-submit"]');
        this.blackTopProduct = page.locator('//a[contains(text(), "Black Top")]').first();
        this.addToCartButton = page.locator('#tyche_products-1').getByRole('link', { name: ' Add to cart' }).first();
        this.cartHeader = page.locator('[class="top-cart"]');
        this.genericShopButton = page.locator('[class="site-title"]');
        this.myAccountButton = page.locator('[class="top-account"]');
    }
    openHomepage = async() => {
        await this.page.goto('/');
    }
    openHomepageAndVerify = async() => {
        await this.page.goto('/');
        await expect(this.page).toHaveTitle(homepageTitle);
    }
    fillSearchInput = async(string) => {
        await this.searchInput.waitFor();
        await this.searchInput.fill(string);
    }
    clickSearchButton = async() => {
        await this.searchButton.waitFor();
        await this.searchButton.click();
    }
    addProduct = async() => {
        await this.addToCartButton.waitFor();
        await this.addToCartButton.click();
    }
    scrollTo = async() => {
        await this.blackTopProduct.waitFor();
        await this.blackTopProduct.focus();
    }
    clickCartHeader = async() => {
        await this.cartHeader.waitFor();
        await this.cartHeader.click();
    }
    getCartHeaderNumber = async() => {
        await this.cartHeader.waitFor();
        const cartHeaderText = await this.cartHeader.innerText();
        const withoutText = cartHeaderText.replace("My Cart - zł ", "");
        return parseInt(withoutText, 10);
    }
    clickGenericShopButton = async() => {
        await this.genericShopButton.waitFor();
        await this.genericShopButton.click();
    }
    clickMyAccountButton = async() => {
        await this.myAccountButton.waitFor();
        await this.myAccountButton.click();
    }
}