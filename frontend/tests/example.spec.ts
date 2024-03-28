import { test, expect } from '@playwright/test'

test('first heading should be My Todos', async ({ page }) => {
  await page.goto('localhost:5173')

  const header = page.getByRole('heading', { name: 'My Todos' }).first()

  await expect(header).toContainText('My Todos')
})

test('should add a todo to the end of the list', async ({ page }) => {
  await page.goto('localhost:5173')

  await page.fill('input[id="name"]', 'New Todo')
  await page.fill('input[id="description"]', 'New Todo Description')

  await page.click('button:has-text("Add Todo")')

  const todoText = page.locator('.Card--text').last()
  const todoTitle = todoText.locator('h1')
  const todoDescription = todoText.locator('span')

  await expect(todoTitle).toContainText('New Todo')
  await expect(todoDescription).toContainText('New Todo Description')

  const todoButton = page.locator('.Card--button').last()
  await todoButton.locator('button:has-text("Delete")').click()
})
