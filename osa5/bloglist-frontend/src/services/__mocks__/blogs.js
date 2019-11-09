const blogs = [
  {
    id: '5a451df7571c224a31b5c8ce',
    title: 'HTML is easy',
    url: '2019-06-11T16:38:15.541Z',
    likes: 100,
    author: 'bababa',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = () => {
  //nothing
}

export default { getAll, setToken }