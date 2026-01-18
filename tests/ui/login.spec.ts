import {test, expect} from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login Functionality - UI Layer', () => {

    test('Successful login with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');

        // Professional Assertion: Verify URL and a visible element
        await expect(page).toHaveURL(/inventory/);
        const title = page.locator('.title');
        await expect(title).toHaveText('Products');
    });
    test('Should display error for locked out user', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.navigate();
        await loginPage.login('locked_out_user', 'secret_sauce');

        // Verify the error handling
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText('locked out');
    });
});