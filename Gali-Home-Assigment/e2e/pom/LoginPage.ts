import { Page } from '@playwright/test';
import {Locator} from "playwright";

const LOGIN_CONTAINER_SELECTOR = "//*[@class='login-container' or @id='new_user_session']";
const EMAIL_INPUT_SELECTOR = `${LOGIN_CONTAINER_SELECTOR}//input[@id='user_session_email']`;
const PASSWORD_INPUT_SELECTOR = `${LOGIN_CONTAINER_SELECTOR}//input[@id='user_session_password']`;
const LOGIN_IN_BUTTON_SELECTOR = `${LOGIN_CONTAINER_SELECTOR}//button[@type='submit']`;

/**
 * POM for cloudinary login page
 */
export class LoginPage {
    public email: Locator;
    public password: Locator;
    public loginButton: Locator;


    constructor(page: Page) {
        this.email = page.locator(EMAIL_INPUT_SELECTOR);
        this.password = page.locator(PASSWORD_INPUT_SELECTOR);
        this.loginButton = page.locator(LOGIN_IN_BUTTON_SELECTOR);
    }

    // Fill in the username and password fields
    async fillCredentials(username: string, password: string, page: Page) {
        await page.goto('https://staging.cloudinary.com/users/login');
        await this.email.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }
}
