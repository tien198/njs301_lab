const express = require('express')

const path = require('path')

const indexRoute = require('./routes/index')
const usersRoute = require('./routes/users')

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.use(indexRoute)
app.use(usersRoute)

app.listen(3000)