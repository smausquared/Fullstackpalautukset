const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', (request, response) => {
    User
      .find({}).populate('blogs')
      .then(users => {
        response.json(users)
      })
  })

usersRouter.post('/', async (request, response) => {
  const username = request.body.username
  const password = request.body.password
  const name = request.body.name
  if (!username || !password) {
      return response.status(400).json({ error: 'error: missing username or password'})
  } else if (password.length <= 3) {
      return response.status(400).json({ error: 'error: password needs to be longer than 3 characters'})
  }
  const saltRounds = 10

  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({username, 
      name, 
      passwordHash,
      blogs: []
  })
  try {
  const savedUser = await user.save()
  response.status(201).json(savedUser)
    } catch {
      response.status(400).json({ error: 'error: invalid username' })
    }
  })

usersRouter.delete('/:id', async (request, response) => {
  try {
  await User.findByIdAndDelete(request.params.id)
  response.status(204).end()
} catch {
  response.status(400).end()
}
})

module.exports = usersRouter