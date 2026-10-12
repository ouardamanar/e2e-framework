import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { InventoryPage } from './pages/InventoryPage';

test.describe('Panier et checkout', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
  });

  test('[PROJ-4] Ajout au panier @smoke', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addBackpackToCart();
    await inventory.expectCartCount('1');
  });

  test('[PROJ-5] Parcours jusqu au checkout @regression', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addBackpackToCart();
    await inventory.goToCart();
    await inventory.startCheckout();
    await expect(page).toHaveURL(/checkout-step-one/);
  });
});