const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(cors())

const users = [{ name: 'user1' }]
app.get('/', (req, res, next) => {
    res.status(200)
        .send(users)
})

app.post('/', (req, res, next) => {
    users.push(req.body)
    console.log(req.body);

    res.sendStatus(200)
})


app.listen(5000)

