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
        await request.post('http://localhost:3001/api/users', {
            data: {
                name: 'Päivi Bloggaaja',
                username: 'paivi',
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
            await expect(blogCont.getByRole('button', { name: 'Show' })).toBeVisible()
            await expect(blogCont).toContainText('Test blog')
        })

        test('Blogs can be liked', async ({ page }) => {
            await loginWith(page, 'rkos', 'salainen')
            await addNewBlog(page, 'Test blog', 'Pete Blogger', 'www.google.com')
            const blogCont = page.locator('.blogCont')
            await blogCont.getByRole('button', { name: 'Show' }).click()
            await expect(blogCont).toContainText('Likes 0')
            await blogCont.getByRole('button', { name: 'Like' }).click()
            await expect(blogCont).toContainText('Likes 1')
        })

        test('The user who added the blog can delete the blog', async ({ page }) => {
            await loginWith(page, 'rkos', 'salainen')
            await addNewBlog(page, 'Test blog', 'Pete Blogger', 'www.google.com')
            const blogCont = page.locator('.blogCont')
            await blogCont.getByRole('button', { name: 'Show' }).click()

            page.once('dialog', async dialog => {
                expect(dialog.type()).toBe('confirm')
                expect(dialog.message()).toBe(
                    'Remove blog Test blog by Pete Blogger?'
                )
                await dialog.accept()
            })

            const blog = blogCont.getByText('Test blog')
            await blog.locator('button:has-text("Remove")').click()

            await expect(blog.getByText('Test blog')).not.toBeVisible()
        })

    })
})

