const { test, expect, beforeEach, describe } = require('@playwright/test')

beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
        data: {
            name: 'Ricky Roto',
            username: 'rkos',
            password: 'salainen'
        }
    })
    await page.goto('/')
})

test('Login form is shown', async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click()
    /*  const textboxes = await page.getByRole('textbox').all()
     await expect(textboxes[0]).toBeVisible()
     await expect(textboxes[1]).toBeVisible() */

    const usernamebox = await page.getByPlaceholder('username')
    const passwordbox = await page.getByPlaceholder('password')
    await expect(usernamebox).toBeVisible()
    await expect(passwordbox).toBeVisible()

})