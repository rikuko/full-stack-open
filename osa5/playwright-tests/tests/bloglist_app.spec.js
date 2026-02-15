const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, addNewBlog } = require('./helpers')

describe('Bloglist app tests', () => {
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

        const usernamebox = await page.getByPlaceholder('username')
        const passwordbox = await page.getByPlaceholder('password')
        await expect(usernamebox).toBeVisible()
        await expect(passwordbox).toBeVisible()
    })

    describe('Login', () => {
        test('Login is successful with the correct credentials', async ({ page }) => {
            await loginWith(page, 'rkos', 'salainen')
            await expect(page.getByText('Your are logged in as Ricky Roto')).toBeVisible()
        })

        test('Login fails with wrong credentials', async ({ page }) => {
            await loginWith(page, 'rkos', 'wrong')
            await expect(page.getByText('Your are logged in as Ricky Roto')).not.toBeVisible()
        })
    })

    describe('Processing blogs', () => {
        test('Logged user can add new blog', async ({ page }) => {
            await loginWith(page, 'rkos', 'salainen')
            await addNewBlog(page, 'Test blog', 'Pete Blogger', 'www.google.com')
            const blogCont = page.locator('.blogCont')
            await expect(blogCont).toContainText('Test blog')
            await expect(blogCont).toContainText('Pete Blogger')
            await expect(blogCont.getByRole('button', { name: 'Show' })).toBeVisible()
        })
    })
})