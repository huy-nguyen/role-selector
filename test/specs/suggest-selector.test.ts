import { expect } from '@playwright/test';
import { test } from '../test-utils';
import { suggestSelector } from '../../';

test.describe('suggestSelector', () => {
  test('suggest selectors', async ({ page, html }) => {
    await html`
      <button aria-pressed="true">Button</button>
      <button aria-expanded="true">Button</button>
      <h2>Heading</h2>
      <h6>Heading</h6>
      <label>
        Input
        <input />
      </label>
      <label>
        Input
        <input placeholder="placeholder" />
      </label>
      <input type="checkbox" />
      <input type="checkbox" checked />
      <input type="submit" value="Submit" />
    `;

    await expect(
      suggestSelector(page.locator('button').first(), { strict: false })
    ).resolves.toEqual({
      type: 'role',
      selector: 'button[name="Button"]',
    });
    await expect(
      suggestSelector(page.locator('button').last())
    ).resolves.toEqual({
      type: 'role',
      selector: 'button[name="Button"][expanded]',
    });
    await expect(suggestSelector(page.locator('h6'))).resolves.toEqual({
      type: 'role',
      selector: 'heading[name="Heading"][level=6]',
    });
    await expect(
      suggestSelector(page.locator('input[placeholder="placeholder"]'))
    ).resolves.toEqual({
      type: 'role',
      selector: 'textbox[name="Input placeholder"]',
    });
    await expect(
      suggestSelector(page.locator('input[type="checkbox"]').last())
    ).resolves.toEqual({
      type: 'role',
      selector: 'checkbox[checked]',
    });
    await expect(
      suggestSelector(page.locator('input[type="submit"]').last())
    ).resolves.toEqual({
      type: 'role',
      selector: 'button[name="Submit"]',
    });
  });

  test('support ElementHandle, Promise<ElementHandle>, or Locator', async ({
    page,
    html,
  }) => {
    await html`<button>Button 1</button>`;

    await expect(suggestSelector(await page.$('button'))).resolves.toEqual({
      type: 'role',
      selector: 'button[name="Button 1"]',
    });
    await expect(suggestSelector(page.$('button'))).resolves.toEqual({
      type: 'role',
      selector: 'button[name="Button 1"]',
    });
    await expect(suggestSelector(page.locator('button'))).resolves.toEqual({
      type: 'role',
      selector: 'button[name="Button 1"]',
    });
  });

  test('suggest test id selector first', async ({ page, html }) => {
    await html`
      <button data-testid="button-1" id="button-1">Button 1</button>
      <button data-test-id="button-2">Button 2</button>
      <button data-test="button-3">Button 3</button>
    `;

    const [button1, button2, button3] = await page.$$('button');

    await expect(suggestSelector(button1)).resolves.toEqual({
      type: 'css',
      selector: '[data-testid="button-1"]',
    });
    await expect(suggestSelector(button2)).resolves.toEqual({
      type: 'css',
      selector: '[data-test-id="button-2"]',
    });
    await expect(suggestSelector(button3)).resolves.toEqual({
      type: 'css',
      selector: '[data-test="button-3"]',
    });
  });

  test('suggest id selector second', async ({ page, html }) => {
    await html`<button id="button-1">Button 1</button>`;

    await expect(suggestSelector(page.locator('button'))).resolves.toEqual({
      type: 'css',
      selector: '#button-1',
    });
  });

  test('suggest role selector third', async ({ page, html }) => {
    await html`<button>Button 1</button>`;

    await expect(suggestSelector(page.locator('button'))).resolves.toEqual({
      type: 'role',
      selector: 'button[name="Button 1"]',
    });
  });

  test('escape characters', async ({ page, html }) => {
    await html`<button>"Button 1"</button>`;

    await expect(suggestSelector(page.locator('button'))).resolves.toEqual({
      type: 'role',
      selector: 'button[name="\\"Button 1\\""]',
    });
  });
});