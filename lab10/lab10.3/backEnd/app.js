const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { log } = require('console')

const shopRoutes = require('./routes/shop')
const adminRoutes = require('./routes/admin')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/favicon.ico', (req, res) => res.status(204).end())

app.use('/', shopRoutes)

app.use('/admin', adminRoutes)

app.listen(5000)


require('./models/Product').findAll({ where: { id: 1 } })
    .then(prod => log(prod))