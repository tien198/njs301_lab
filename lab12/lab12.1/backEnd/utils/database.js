const { error } = require('console')
const { MongoClient } = require('mongodb')

const local = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.9'

const client = new MongoClient(local, {
    maxPoolSize: 10,
    minPoolSize: 2
})

async function connect() {
    try {
        await client.connect()
        return client.db('shopLab')
    }
    catch (err) {
        error(err)
    }
}

async function productCollection() {
    const db = await connect()
    return db.collection('products')
}

module.exports = { client, connect, productCollection }