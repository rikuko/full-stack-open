const loginWith = async (page, username, password) => {
    await page.getByRole('button', { name: 'Login' }).click()
    await page.getByPlaceholder('username').fill(username)
    await page.getByPlaceholder('password').fill(password)
    await page.getByRole('button', { name: 'Login' }).click()
}

const addNewBlog = async (page, title, author, url) => {
    await page.getByPlaceholder('title').fill(title)
    await page.getByPlaceholder('author').fill(author)
    await page.getByPlaceholder('url').fill(url)
    await page.getByRole('button', { name: 'Save' }).click()
}

export {
    loginWith,
    addNewBlog
}