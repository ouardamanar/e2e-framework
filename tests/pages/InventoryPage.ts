import { Page, expect } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  async addBackpackToCart() {
    await this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  }

  async expectCartCount(count: string) {
    await expect(this.page.locator('[data-test="shopping-cart-badge"]')).toHaveText(count);
  }

  async goToCart() {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
  }

  async startCheckout() {
    await this.page.locator('[data-test="checkout"]').click();
  }
}