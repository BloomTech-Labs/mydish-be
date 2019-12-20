//setup
const express = require('express')
const server = express()
const router = express.Router()

//import and use middleware
server.use(require('cors')())
server.use(require('helmet')())
server.use(express.json())

//routers
server.use('/users', require('./endpoints/users.js'))
server.use('/recipes', require('./endpoints/recipes.js'))

//catchall endpoint
server.get('/', (req, res) => {
    res.status(200).json('Yup, it works.')
})