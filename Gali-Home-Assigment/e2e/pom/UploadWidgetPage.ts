import {FrameLocator, Page} from '@playwright/test';
import {Locator} from "playwright";

const ADVANCED_BUTTON_SELECTOR = '//button[@data-test="btn-advanced"]';
const ADVANCED_PUBLIC_ID_INPUT_SELECTOR = '//input[@data-test="public-id"]';
const IFRAME_SELECTOR = "//iframe[@data-test='uw-iframe']";
const BROWSE_INPUT_SELECTOR = '//input[@class="cloudinary_fileupload"]'
const COMPLETED_MESSAGE_SELECTOR = '//*[@data-test="show-completed-button"]';



/**
 * POM for cloudinary login page
 */
export class UploadWidgetPage {
    public advancedButton: Locator;
    public advancedPublicIdInput: Locator;
    public iframeSelector: FrameLocator;
    public browseSelector: Locator;
    public completedMessageSelector: Locator;

    constructor(page: Page) {
        this.iframeSelector = page.frameLocator(IFRAME_SELECTOR);
        this.advancedButton = this.iframeSelector.locator(ADVANCED_BUTTON_SELECTOR);
        this.advancedPublicIdInput = this.iframeSelector.locator(ADVANCED_PUBLIC_ID_INPUT_SELECTOR);
        this.browseSelector = this.iframeSelector.locator(BROWSE_INPUT_SELECTOR);
        this.completedMessageSelector = this.iframeSelector.locator(COMPLETED_MESSAGE_SELECTOR);

    }

    public async setPublicId(randomPublicId: string): Promise<void> {
        await this.advancedButton.click(); // open advanced options popover
        await this.advancedPublicIdInput.fill(randomPublicId);
        await this.advancedButton.click(); // close advanced options popover
    }

    public async uploadFile(filePath: string): Promise<void> {
        // Locate the file input element and set the file to be uploaded
        const fileInput = this.browseSelector;
        if (fileInput) {
            await fileInput.setInputFiles(filePath);
        }
        //Wait for success message
        await this.completedMessageSelector.waitFor();
    }
}
