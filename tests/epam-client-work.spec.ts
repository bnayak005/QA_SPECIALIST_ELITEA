import { test, expect } from '@playwright/test';

test.describe('EPAM Client Work navigation', () => {
  test('should navigate from Services to Client Work', async ({ page }) => {
    await page.goto('https://www.epam.com/', {
      waitUntil: 'domcontentloaded',
    });

    const acceptCookies = page.getByRole('button', {
      name: /accept all/i,
    });

    if (await acceptCookies.isVisible().catch(() => false)) {
      await acceptCookies.click();
    }

    await page.getByRole('link', {
      name: 'Services',
      exact: true,
    }).click();

    const clientWorkLink = page.getByRole('link', {
      name: /Explore Our Client Work/i,
    });

    await expect(clientWorkLink).toBeVisible();
    await clientWorkLink.click();

    await expect(page).toHaveURL(/\/services\/client-work/);
    await expect(
      page.getByRole('heading', {
        name: 'Client Work',
        exact: true,
      }),
    ).toBeVisible();
  });
});
