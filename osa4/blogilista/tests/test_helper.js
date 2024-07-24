bcrypt = require('bcryptjs')

const initialBlogs = [
    {
        title: "React patterns",
        author: "Edsger W. Dijkstra",
        url: "https://reactpatterns.com/",
        likes: 7
    },
    {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10
    }
]

const initialUsers = async () => {
    const hasher = async (pwd) => {
        const hashed = await bcrypt.hash(pwd, 10) // funktiosäätöä 👹
        return hashed
    }
    const hashwords = async () => {
        const ewhash = await hasher("salasala")
        const binghash = await hasher("salasananas")
        return { ewhash: ewhash, binghash: binghash }
    }
    const hashes = await hashwords()
    return [
    {
        username: "EWBush",
        name: "Edsger W. Bush",
        passwordHash: `${hashes.ewhash}`,
    },
    {
        username: "bingus",
        name: "Hairless Cat",
        passwordHash: `${hashes.binghash}`,
    }
]}

module.exports = {
    initialBlogs, initialUsers
  }