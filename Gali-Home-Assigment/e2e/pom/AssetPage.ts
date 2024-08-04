import { Page } from '@playwright/test';
import {Locator} from "playwright";

const ASSET_TITLE_SELECTOR = '//*[@data-test="asset-title"]';


/**
 * POM for cloudinary asset page
 */
export class AssetPage {
    public assetTitle: Locator;


    constructor(page: Page) {
        this.assetTitle = page.locator(ASSET_TITLE_SELECTOR);
    }
}
