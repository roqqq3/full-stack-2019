const bodyParser = require('body-parser')
const cors = require('cors')
const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
require('dotenv').config()

const getTokenFrom = (request, response, next) => {
  console.log(request.method)
  if (request.method == "POST" || request.method == "DELETE") {
    console.log("haha changing")
    const authorization = request.get('authorization')  
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {    
      request.token = authorization.substring(7)  
    }
  }
  console.log("done")
  next()
}

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true })

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())

app.use(getTokenFrom)
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

module.exports = app