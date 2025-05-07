const { error } = require('console')
const { MongoClient } = require('mongodb')

const local = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.9'

const client = new MongoClient(local, {
    maxPoolSize: 10,
    minPoolSize: 2
})

async function connect() {
    try {
        return await client.connect()
    }
    catch (err) {
        error(err)
    }
}

async function getDb() {
    return client.db('shopLab')
}

async function productCollection() {
    const db = await getDb()
    return db.collection('products')
}

async function userCollection() {
    const db = await getDb()
    return db.collection('users')
}

async function orderCollection() {
    const db = await getDb()
    return db.collection('orders')
}

module.exports = { client, connect, getDb, productCollection, userCollection, orderCollection }