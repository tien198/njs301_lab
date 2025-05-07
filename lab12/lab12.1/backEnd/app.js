const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { log, error } = require('console')

// const { client } = require('./utils/database')

const shopRoutes = require('./routes/shop')
const adminRoutes = require('./routes/admin')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use((req, res, next) => {
    // User.findByPk(1)
    //     .then(usr => {
    //         req.user = usr
    //         next()
    //     })
    //     .catch(err => error(err))
    next()
})
app.get('/favicon.ico', (req, res) => res.status(204).end())


app.use('/', shopRoutes)

app.use('/admin', adminRoutes)

// process.on('exit', () => client.close())

// client.connect()
//     .then(client => client.db('shopLab'))
//     .then(async db => {
//         const prodsCollection = db.collection('products')
//         const prodDocs = await prodsCollection.find().toArray()
//         if (prodDocs.length <= 0)
//             try {
//                 prodsCollection.insertMany([
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
//     })
//     .catch(err => error(err))
app.listen(5000, ()=>{
    log('server is running in port 5000')
})