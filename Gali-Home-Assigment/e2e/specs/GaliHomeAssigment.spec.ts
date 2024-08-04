import { test, expect } from '@playwright/test';
import { chromium } from 'playwright';
import {LoginPage} from "../pom/LoginPage";
import {MediaLibraryPage} from "../pom/MediaLibraryPage";
import {generateRandomString, UploadWidgetPage} from "../pom/UploadWidgetPage";
import {AssetPage} from "../pom/AssetPage";


test('Gali Home Assigment', async () => {
    //Start chromium browser
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    const loginPage = new LoginPage(page);
    const mediaLibraryPage = new MediaLibraryPage(page);
    const uploadWidgetPage = new UploadWidgetPage(page);
    const newPublicId = generateRandomString(5);
    const assetPage = new AssetPage(page);
    const username = process.env.USERNAME as string;
    const password = process.env.PASSWORD as string;
    const myFile = '/Users/galiel/Documents/Gali/asset/1.jpeg'

    await test.step('Navigate to Login page', async () => {
        await page.goto('https://staging.cloudinary.com/users/login')
    })

    await test.step('Fill user name and password and click Login', async () => {
        await loginPage.fillCredentials(username, password);
    })

    await test.step('Goto ML Assets tab', async () => {
        await mediaLibraryPage.directToAssetTab();
    })

    await test.step('Click on Upload button', async () => {
        await mediaLibraryPage.uploadButton.click();
    })

    await test.step('Set public id button', async () => {
        await uploadWidgetPage.setPublicId(newPublicId);
    })

    await test.step('Upload from My computer and wait for success message', async () => {
        await uploadWidgetPage.uploadFile(myFile);
    })

    await test.step('Open asset page', async () => {
        await mediaLibraryPage.openAsset(page,newPublicId);
    })

    await test.step('Verify the correct Public ID appears is asset page', async () => {
        await expect(assetPage.assetTitle).toHaveText(newPublicId);
    })

    // Close the browser
    await browser.close();
})



