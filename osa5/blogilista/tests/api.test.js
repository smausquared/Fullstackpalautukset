const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert') // lupaan että kaikki testit toimi ja meni läpi :D
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

describe('Blog tests', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
    })

    test('can get blogs', async () => {
        const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

        assert.strictEqual(response.body.length, helper.initialBlogs.length
        )
    })

    test('identifier is id', async () => {
        const response = await api
        .get('/api/blogs')
        .expect(200)
        
        assert(Object.hasOwn(response.body[0], 'id'))
        assert(!Object.hasOwn(response.body[0], '_id'))
    })

    test('can send new blog', async () => {
        const newBlog = {
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 0
        }

        const sentBlog = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
        assert.strictEqual(sentBlog.body.title, newBlog.title)
        
    })

    test('if likes isnt defined, set to 0', async () => {
        const newBlog = {
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        }

        const sentBlog = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        assert.strictEqual(sentBlog.body.likes, 0)
        
    })

    test('if url or title is missing, respond 400 bad request', async () => {
        const newBlog = {
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        }
        
        const otherBlog = {
            title: "Title: an analysis of Titles",
            author: "Michael Myers"
        }

        const sentBlog = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

        const sentOther = await api
        .post('/api/blogs')
        .send(otherBlog)
        .expect(400)

        assert.strictEqual(sentBlog.statusCode, 400)
        assert.strictEqual(sentOther.statusCode, 400)
    })

    test('can delete blog', async () => {
        const initialBlogs = await api
        .get('/api/blogs')
        const initialCount = initialBlogs.body.length
        const blogToDelete = initialBlogs.body[0]
        await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

        const endBlogs = await api
        .get('/api/blogs')
        const endCount = endBlogs.body.length
        assert.strictEqual(initialCount, endCount + 1)
    })

    test('can update existing blog', async () => {
        const initialBlogs = await api
        .get('/api/blogs')
        console.log(initialBlogs.body)
        const blogToUpdate = initialBlogs.body[initialBlogs.body.length-1]
        console.log(blogToUpdate)
        const updatedBlog = {...blogToUpdate, author: 'Apina Mies Os. Suurin'}
        delete updatedBlog.id

        await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)

        const endBlogs = await api
        .get('/api/blogs')

        assert.strictEqual(endBlogs.body[endBlogs.body.length-1].author, 'Apina Mies Os. Suurin')
    })
})

describe('user tests', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const users = await helper.initialUsers()
        const userAmount = users.length
        await User.insertMany(users)
    })

    test('can get users', async () => {
        userAmount = (await helper.initialUsers()).length
        const response = await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)

        assert.strictEqual(response.body.length, userAmount
        )
    })

    test('posting of user with no username or password fails', async () => {
        const newUser = {
            username: "Tigole",
            name: "Jeff Kaplan"
        }
        
        const otherUser = {
            name: "Jeff Kaplan",
            password: "tigole1"
        }
        const sentUser = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        const sentOther = await api
        .post('/api/users')
        .send(otherUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
        
        assert.strictEqual(sentUser.body.error, 'error: missing username or password')
        assert.strictEqual(sentOther.body.error, 'error: missing username or password')
        })
    
    
    test('posting of user with too short password or username fails', async () => {
        const newUser = {
            username: "go",
            name: "Jeff Kaplan",
            password: "tigole1"
        }
        
        const otherUser = {
            username: "tigole",
            name: "Jeff Kaplan",
            password: "go"
        }
        const sentUser = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        const sentOther = await api
        .post('/api/users')
        .send(otherUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
        
        assert.strictEqual(sentUser.body.error, 'error: invalid username')
        assert.strictEqual(sentOther.body.error, 'error: password needs to be longer than 3 characters')
        })
    })

    after(async () => {
    await mongoose.connection.close()
  })