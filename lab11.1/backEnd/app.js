const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { log, error } = require('console')

const se = require('./utils/database')
const User = require('./models/user')

const shopRoutes = require('./routes/shop')
const adminRoutes = require('./routes/admin')

const addAssociations = require('./utils/sequelizeAssociations/addAssociations')

const Cart = require('./models/cart')
const Product = require('./models/product')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use((req, res, next) => {
    User.findByPk(1)
        .then(usr => {
            req.user = usr
            next()
        })
        .catch(err => error(err))
})
app.get('/favicon.ico', (req, res) => res.status(204).end())


app.use('/', shopRoutes)

app.use('/admin', adminRoutes)

addAssociations()

// se.sync({ force: true })
se.sync()
    .then(res => {
        return User.findByPk(1)
    })
    .then(user => {
        if (!user)
            return User.create({ id: 1, name: 'Tien', email: 'test@test.com' })
        else
            return user
    })
    .then(user => {
        Cart.findByPk(1)
            .then(i => {
                if (!i)
                    user.createCart()
            })

        Product.findByPk(1)
            .then(i => {
                if (!i) {
                    user.createProduct({
                        title: 'A Book',
                        price: 12.99,
                        imageUrl: 'https://www.publicdomainpictures.net/pictures/10000/velka/1-1210009435EGmE.jpg',
                        description: 'This is an awesome book!'
                    })
                    user.createProduct({
                        title: 'Another Book',
                        price: 1.99,
                        imageUrl: 'https://www.publicdomainpictures.net/pictures/10000/velka/1-1210009435EGmE.jpg',
                        description: 'This is another!'
                    })
                }
            })
    })
    .then(() =>
        app.listen(5000)
    )
    .catch(err => error(err))
