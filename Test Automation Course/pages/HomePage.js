import { expect } from "@playwright/test";
import { homePageTitle } from "../lib/text";

export class HomePage{
    /**
     *
     * @param {import("@playwright/test").Page} page
     */
    constructor(page){
        this.page = page;
        this.navigationTabs = page.locator("[data-qa='desktop-nav-link']");
        this.productCard = page.locator('[data-qa="product-title"]').first();
        this.productCards = page.locator('[data-qa="product-title"]');
        this.dropdown = page.locator('[data-qa="sort-dropdown"]');
        this.cartCount = page.locator('[data-qa="header-basket-count"]');
        this.addToBasketButton = page.locator('[data-qa="product-button"]').first();
        this.addToBasketButtons = page.locator('[data-qa="product-button"]');
    }
    openHomepage = async() => {
        await this.page.goto("/");
    }
    openHomepageAndVerify = async() => {
        await this.page.goto("/");
        await expect(this.page).toHaveTitle(homePageTitle);
    }
    clickNavigationTab = async(number) => {
        const specificNavigationTab = this.navigationTabs.nth(number);
        await specificNavigationTab.waitFor();
        await specificNavigationTab.click();
    }
    setDropdownValueAsc = async() => {
        await this.dropdown.waitFor();
        await this.dropdown.selectOption("price-asc");
    }
    setDropdownValueDefault = async() => {
        await this.dropdown.waitFor();
        await this.dropdown.selectOption("default");
    }
    setDropdownValueAndVerify = async() => {
        await this.dropdown.waitFor();
        await this.dropdown.selectOption("price-asc");
        await expect(this.dropdown).toHaveValue("price-asc");
        await expect(this.productCard).toHaveText("Baby Zebra with butterfly");
        await this.dropdown.waitFor();
        await this.dropdown.selectOption("Popularity (default)");
        await expect(this.dropdown).toHaveValue("default");
        await expect(this.productCard).toHaveText("Astronaut dabbing");
    }
    addProductToCart = async() => {
        await this.addToBasketButton.waitFor();
        await this.addToBasketButton.click();
    }
    addProductsToCartAndVerify = async(number) => {
        const specificAddButton = await this.addToBasketButtons;
        await specificAddButton.nth(number).waitFor();
        const textBeforeAdding = await specificAddButton.nth(number).innerText();
        const cartCountBeforeAdding = await this.getCartCountNumber();
        await specificAddButton.nth(number).click();
        const textAfterAdding = await specificAddButton.nth(number).innerText();
        const cartCountAfterAdding = await this.getCartCountNumber();
        await expect(await cartCountAfterAdding).toBeGreaterThan(cartCountBeforeAdding);
        await expect(await textAfterAdding).not.toBe(textBeforeAdding);
    }
    getCartCountNumber = async() => {
        const cartCountText = await this.cartCount.innerText();
        return parseInt(cartCountText, 10);
    }
}