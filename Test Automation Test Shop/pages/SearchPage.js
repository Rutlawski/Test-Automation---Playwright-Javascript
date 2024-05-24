export class SearchPage{
    /**
 *
 * @param {import("@playwright/test").Page} page
 */
    constructor(page){
        this.page = page;
        this.productCards = page.locator('[class="entry-content"]');
        this.incorrectSearchHeader = page.locator('//h1[contains(text(), "Nothing Found")]');
    }
}