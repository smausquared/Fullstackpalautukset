const dummy = (blogs) => {
    return 1
  }
  
const totalLikes = (blogs) => {
    const likes = blogs.map(b => b.likes)
    const reducer = (sum, likes) => {
        return sum + likes
    }
    return likes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length=== 0) {
        return null
    }
    var highest = 0
    blogs.forEach(blog => {
        if (blog.likes > highest) {
            highest = blog.likes
        }
    })
    const isMost = (blog) => {
        return blog.likes === highest
    }
    const favorite = blogs.find(isMost)
    const formatted = {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    }
    return formatted
}

const mostBlogs = (blogs) => { // lodashissa oli niin helvetisti eri metodeja
    if (blogs.length === 0) {
        return null
    }
    const names = blogs.map(b => b.author) // että tein mielummin vaan ite
    const uniq = [...new Set(names)]
    var blogsOfEachAuthor = []
    uniq.forEach((name, index) => {
        blogsOfEachAuthor.push({name: name, bloglist: []})
        blogs.forEach((blog) => {
            if (blog.author === name) {
                blogsOfEachAuthor[index].bloglist.push(blog)
            }
        })
    })
    var highest = 0
    blogsOfEachAuthor.forEach(author => {
        if (author.bloglist.length > highest) {
            highest = author.bloglist.length
        }
    })
    const isMostBlogged = (blogger) => {
        return blogger.bloglist.length === highest
    }
    const most = blogsOfEachAuthor.find(isMostBlogged)
    return {author: most.name, blogs: highest}
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    const names = blogs.map(b => b.author)
    const uniq = [...new Set(names)]
    var blogsOfEachAuthor = []
    uniq.forEach((name, index) => {
        blogsOfEachAuthor.push({name: name, bloglist: []})
        blogs.forEach((blog) => {
            if (blog.author === name) {
                blogsOfEachAuthor[index].bloglist.push(blog)
            }
        })
    })

    var highest = 0
    var AuthorsLikes = []
    blogsOfEachAuthor.forEach((author) => {
        const likes = author.bloglist.map(b => b.likes)
        const reducer = (sum, likes) => {
            return sum + likes
    }
        const liked = likes.reduce(reducer, 0)
        if (liked > highest) {
            highest = liked
        }
        AuthorsLikes.push({name: author.name, likes: liked})
        })


    const isMostLiked = (blogger) => {
        return blogger.likes === highest
    }
    const most = AuthorsLikes.find(isMostLiked)
    console.log(most)
    return {author: most.name, likes: highest}
}


  module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
  }
