const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { log, error } = require('console')
const Mongoose = require('mongoose')

// const { client, productCollection, userCollection } = require('./utils/database')

const User = require('./models/user')

const shopRoutes = require('./routes/shop')
const adminRoutes = require('./routes/admin')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use((req, res, next) => {
    next()
})
app.get('/favicon.ico', (req, res) => res.status(204).end())


app.use('/', shopRoutes)

app.use('/admin', adminRoutes)


const local = 'mongodb://127.0.0.1:27017/shopLab?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.9'
Mongoose.connect(local)
    .then(_ => {
        app.listen(5000)
    }
    )
    .catch(err => error(err))


// client.connect()
//     .then(client => client.db('shopLab'))
//     .then(async db => {
//         const prodCol = await productCollection()
//         const prodDocs = await prodCol.find().toArray()
//         if (prodDocs.length <= 0)
//             try {
//                 await prodCol.insertMany([
//                     {
//                         "id": "1",
//                         "title": "A Book",
//                         "imageUrl": "https://www.publicdomainpictures.net/pictures/10000/velka/1-1210009435EGmE.jpg",
//                         "description": "This is an awesome book!",
//                         "price": "19"
//                     },
//                     {
//                         "id": "2",
//                         "title": "Kẻ đẹp trai",
//                         "imageUrl": "https://www.publicdomainpictures.net/pictures/10000/velka/1-1210009435EGmE.jpg",
//                         "description": "Woá toẹt zời",
//                         "price": "12"
//                     },
//                     {
//                         "id": "3",
//                         "title": "New Product",
//                         "imageUrl": "https://www.publicdomainpictures.net/pictures/10000/velka/1-1210009435EGmE.jpg",
//                         "description": "description",
//                         "price": "13"
//                     }
//                 ])
//             }
//             catch (err) {
//                 error(err)
//             }
//         const userCol = await userCollection()
//         const userDocs = await userCol.find().toArray()
//         if (userDocs.length <= 0)
//             try {
//                 await userCol.insertOne({ name: 'tien', email: 'admin@gmail.com' })
//             }
//             catch (err) {
//                 error(err)
//             }
//     })
//     .catch(err => error(err))

