const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs[0] === undefined) {
    return 0
  } else {
    return blogs.map((blog) => blog.likes).reduce((a, b) => a + b)
  }
}

const favoriteBlog = (blogs) => {
  var res = Math.max.apply(Math, blogs.map(function(o){return o.likes;}))
  return blogs.find(function(o){ return o.likes == res; })
}

const mostLikes = (blogs) => {
  let maxAuthor = blogs[0].author
  let maxBlogs = 1
  for (let i = 0; i < blogs.length; i++) {
    let curAuthor = blogs[i].author
    let count = 0
    for (let j = 0; j < blogs.length; j++) {
      if (blogs[j].author === curAuthor) {
        count += blogs[j].likes
      }
    }
    if (count > maxBlogs) {
      maxAuthor = curAuthor
      maxBlogs = count
    }
  }
  return {
    'author': maxAuthor,
    'blogs': maxBlogs
  }
}

const mostBlogs = (blogs) => {
  let maxAuthor = blogs[0].author
  let maxBlogs = 1
  for (let i = 0; i < blogs.length; i++) {
    let curAuthor = blogs[i].author
    let count = 0
    for (let j = 0; j < blogs.length; j++) {
      if (blogs[j].author === curAuthor) {
        count += 1
      }
    }
    if (count > maxBlogs) {
      maxAuthor = curAuthor
      maxBlogs = count
    }
  }
  return {
    'author': maxAuthor,
    'blogs': maxBlogs
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}