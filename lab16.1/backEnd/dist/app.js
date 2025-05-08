import './.d.ts/request.d.ts';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { log, error } from 'console';
import Mongoose from 'mongoose';
// import { client, productCollection, userCollection } from './utils/database';
import User from './models/mongooseModels/User.js';
import shopRoutes from './routes/shop.js';
import adminRoutes from './routes/admin.js';
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
    User.find()
        .then(users => {
        req.user = users[0];
        next();
    })
        .catch(err => {
        error(err);
        res.status(400).send('Could\'t to find user');
    });
});
app.get('/favicon.ico', (req, res) => {
    res.status(204).end();
});
app.use('/', shopRoutes);
app.use('/admin', adminRoutes);
const local = 'mongodb://127.0.0.1:27017/shopLab?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.9';
Mongoose.connect(local)
    .then(_ => {
    app.listen(5000);
})
    .catch(err => error(err));
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
//                         "title": "Kẻ giả tạo",
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
