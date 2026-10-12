import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

test.describe('Authentification', () => {
  test('[PROJ-1] Connexion valide @smoke', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
  });

  test('[PROJ-2] Mauvais mot de passe @regression', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'mauvais');
    await login.expectError();
  });

  test('[PROJ-3] Utilisateur verrouillé @regression', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('locked_out_user', 'secret_sauce');
    await login.expectError();
  });
});