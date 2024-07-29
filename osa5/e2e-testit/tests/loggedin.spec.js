
// describe('When logged in', () => {
//     beforeEach(async ({ page }) => {
//         const textboxes = await page.getByRole('textbox').all()
//         await textboxes[0].fill('mluukkai')
//         await textboxes[1].fill('salainen')
//         await page.getByRole('button', { name: 'login' }).click()
//     })
//     
//     test.only('a new blog can be created', async ({ page }) => {
//         await page.getByRole('button', { name: 'new blog' }).click()
//         const textboxes = await page.getByRole('textbox').all()
//         await textboxes[0].fill('Blog 1')
//         await textboxes[1].fill('Bloggus Hex')
//         await textboxes[2].fill('bloggus.com')
//         await page.getByRole('button', { name: 'Submit' }).click()
//         await expect(page.getByText('a new blog Blog 1 by Bloggus Hex added')).toBeVisible()
//         await expect(page.getByText('Blog 1viewbloggus.com 0 likes')).toBeVisible()
//     })
//     })
