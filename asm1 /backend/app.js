const app = require('express')()
const cors = require('cors')
const bodyParser = require('body-parser')

const movieRouter = require('./routes/movie')
const tetsMemRouter = require('./routes/testTemp')
const authorRouter = require('./routes/authorization')

app.use(cors())
app.use(bodyParser.json())


app.use(authorRouter)

app.use(movieRouter)

app.use(tetsMemRouter)

app.use((req, res, next) =>
    res.status(404).send({
        message: "Route not found"
    })
)

app.listen(5000)