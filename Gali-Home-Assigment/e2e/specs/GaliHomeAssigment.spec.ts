import {test, expect} from '@playwright/test';
import {LoginPage} from "../pom/LoginPage";
import {MediaLibraryPage} from "../pom/MediaLibraryPage";
import {UploadWidgetPage} from "../pom/UploadWidgetPage";
import {AssetPage} from "../pom/AssetPage";
import {generateRandomString} from "../utils/GenerateRandomStringUtil";



test('Gali Home Assigment', async ({page}) => {
    const loginPage = new LoginPage(page);
    const mediaLibraryPage = new MediaLibraryPage(page);
    const uploadWidgetPage = new UploadWidgetPage(page);
    const newPublicId = generateRandomString(5);
    const assetPage = new AssetPage(page);
    const username = process.env.USERNAME as string;
    const password = process.env.PASSWORD as string;
    const myFile =  './e2e/media/asset.png'

    await test.step('Navigate to Login page', async () => {
        await page.goto('https://staging.cloudinary.com/users/login')
    })

    await test.step('Go to Login page, fill user name and password and click Login', async () => {
        await loginPage.fillCredentials(username, password, page);
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


})



