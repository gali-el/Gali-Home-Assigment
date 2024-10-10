import { Page} from '@playwright/test';
import {Locator} from "playwright";

const ML_PRODUCT_SELECTOR = '//*[@data-test="link-button" and @id="cloudinary_assets"]';
const ASSETS_TAB_SELECTOR = '//*[@data-test="tab-mediaLibraryAssets"]';
const UPLOAD_SELECTOR = '//button[@data-test="upload-btn"]';
const OPEN_BUTTON_SELECTOR = '//*[@data-test="action-manage-btn"]';




/**
 * POM for cloudinary Media Library page
 */
export class MediaLibraryPage {
    public mlProduct: Locator;
    public assetTab: Locator;
    public uploadButton: Locator;
    public assetCard: Locator | any;
    public openButton: Locator;




    constructor(page: Page) {
        this.mlProduct = page.locator(ML_PRODUCT_SELECTOR);
        this.assetTab = page.locator(ASSETS_TAB_SELECTOR);
        this.uploadButton = page.locator(UPLOAD_SELECTOR);
        this.openButton = page.locator(OPEN_BUTTON_SELECTOR);
    }

    public async directToAssetTab(): Promise<void> {
        await this.mlProduct.click();
        await this.assetTab.click();
    }
    public async openAsset(page: Page, RandomPublicId: string): Promise<void> {
        const ASSET_SELECTOR = (`//*[@data-test-specifier="${RandomPublicId}"]`)
        this.assetCard = page.locator(ASSET_SELECTOR);
        await this.assetCard.waitFor();
        await this.assetCard.click({button: 'right', force: true });
        await this.openButton.click();
    }
}

