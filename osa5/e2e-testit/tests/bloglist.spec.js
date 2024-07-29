const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog list', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen',
        blogs: []
      }
    })
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Pekka Puukkainen',
        username: 'Pekpuuk',
        password: 'salasala',
        blogs: []
      }
    })
    
    await page.goto('http://localhost:5173')
})

  test('Login form is shown', async ({ page }) => {
    const loginForm = await page.getByText('blogsusernamepasswordlogin')
    await expect(loginForm).toBeVisible()
    })

  describe('Login', () => {
      test('succeeds with correct credentials', async ({ page }) => {
          const textboxes = await page.getByRole('textbox').all()
          await textboxes[0].fill('mluukkai')
          await textboxes[1].fill('salainen')
          await page.getByRole('button', { name: 'login' }).click()
          await expect(page.getByText('new blog')).toBeVisible()
      })

      test('fails with wrong credentials', async ({ page }) => {
          const textboxes = await page.getByRole('textbox').all()
          await textboxes[0].fill('mluukkai')
          await textboxes[1].fill('vääräsalasananas')
          await page.getByRole('button', { name: 'login' }).click()
          await expect(page.getByText('wrong credentials')).toBeVisible()
      })
      })
    
  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
        const textboxes = await page.getByRole('textbox').all()
        await textboxes[0].fill('mluukkai')
        await textboxes[1].fill('salainen')
        await page.getByRole('button', { name: 'login' }).click()
    })
    
    test('a new blog can be created', async ({ page }) => {
        await page.getByRole('button', { name: 'new blog' }).click()
        const textboxes = await page.getByRole('textbox').all()
        await textboxes[0].fill('Blog 1')
        await textboxes[1].fill('Bloggus Hex')
        await textboxes[2].fill('bloggus.com')
        await page.getByRole('button', { name: 'Submit' }).click()
        await expect(page.getByText('a new blog Blog 1 by Bloggus Hex added')).toBeVisible()
        await expect(page.getByText('Blog 1viewbloggus.com 0 likes')).toBeVisible()
    })
  
  describe('a created blog', () => {
    beforeEach(async ({ page }) => {
        await page.getByRole('button', { name: 'new blog' }).click()
        const textboxes = await page.getByRole('textbox').all()
        await textboxes[0].fill('Blog 1')
        await textboxes[1].fill('Bloggus Hex')
        await textboxes[2].fill('bloggus.com')
        await page.getByRole('button', { name: 'Submit' }).click()
        await page.getByText('blog Blog 1').waitFor()
    })
  
    test('can be liked', async ({ page }) => {
      await page.getByRole('button', {name: 'view'}).click()
      await page.getByRole('button', {name: 'like'}).click()
      await expect(page.getByText('Blog 1viewbloggus.com 1 likes')).toBeVisible()
    })
    
    test('can be deleted by its creator', async ({ page }) => {
      await page.getByRole('button', {name: 'view'}).click()
      page.on('dialog', dialog => dialog.accept())
      await page.getByRole('button', {name: 'delete'}).click()
      
      await expect(page.getByText('Blog 1viewbloggus.com 0 likes')).not.toBeVisible()
    })

    test('has no delete button if its creator isnt logged in', async ({ page }) => {
      await page.evaluate(() => {
        window.localStorage.removeItem('loggedBlogappUser')
      })
      await page.reload()
      const textboxes = await page.getByRole('textbox').all()
      await textboxes[0].fill('Pekpuuk')
      await textboxes[1].fill('salasala')
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', {name: 'delete'})).not.toBeVisible()
    })

    
      test('monolithic monster test v2', async ({ page }) => {
        await page.getByText('Blog 1viewbloggus.com 0 likes').waitFor()
        const textboxes = await page.getByRole('textbox').all()
        await textboxes[0].fill('Blog 3')
        await textboxes[1].fill('Bloggus Hex')
        await textboxes[2].fill('bloggus.com')
        await page.getByRole('button', { name: 'Submit' }).click()
        await page.getByText('Blog 3viewbloggus.com 0 likes').waitFor()

        const textboxes2 = await page.getByRole('textbox').all()
        await textboxes2[0].fill('Blog 2')
        await textboxes2[1].fill('Bloggus Hex')
        await textboxes2[2].fill('bloggus.com')
        await page.getByRole('button', { name: 'Submit' }).click()
        await page.getByText('Blog 2viewbloggus.com 0 likes').waitFor()
        await page.getByRole('button', { name: 'cancel' }).click();
        
        await expect(page.locator('html')).toContainText('blogsBlog 1viewbloggus.com 0 likes like Bloggus Hex deletecancelBlog 3viewbloggus.com 0 likes like Bloggus Hex deletecancelBlog 2viewbloggus.com 0 likes like Bloggus Hex deletecancelnew blogtitle:author:url:Submitcancel');
        await page.locator('div').filter({ hasText: /^Blog 3viewbloggus\.com 0 likes like Bloggus Hex deletecancel$/ }).getByRole('button').click();
        await page.getByRole('button', { name: 'like' }).click();
        await page.getByText('1 likes').waitFor()
        await page.getByRole('button', { name: 'like' }).click();
        await page.getByText('2 likes').waitFor()
        await page.getByRole('button', { name: 'like' }).click();
        await page.getByText('3 likes').waitFor()
        await page.getByRole('button', { name: 'cancel' }).click();
        await page.locator('div').filter({ hasText: /^Blog 2viewbloggus\.com 0 likes like Bloggus Hex deletecancel$/ }).getByRole('button').click();
        await page.getByRole('button', { name: 'like' }).click();
        await page.getByText('1 likes').waitFor()
        await page.getByRole('button', { name: 'like' }).click();
        await page.getByText('2 likes').waitFor()
        await page.getByRole('button', { name: 'cancel' }).click();
        await page.locator('div').filter({ hasText: /^viewbloggus\.com 0 likes like Bloggus Hex deletecancel$/ }).getByRole('button').click();
        await page.getByRole('button', { name: 'like' }).click();
        await page.getByText('1 likes').waitFor()
        await page.getByRole('button', { name: 'cancel' }).click();
        await expect(page.locator('html')).toContainText('blogsBlog 3viewbloggus.com 3 likes like Bloggus Hex deletecancelBlog 2viewbloggus.com 2 likes like Bloggus Hex deletecancelBlog 1viewbloggus.com 1 likes like Bloggus Hex deletecancelnew blogtitle:author:url:Submitcancel');
      })
  })
  })
})
