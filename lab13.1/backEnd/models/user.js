const { error } = require('console')
const MongoDb = require('mongodb')
const { cloneDeep } = require('lodash')
const { userCollection, orderCollection } = require('../utils/database')

module.exports = class User {
    constructor(name, email, _id, cart) {
        this.name = name
        this.email = email
        if (_id instanceof MongoDb.ObjectId)
            this._id = _id
        else
            this._id = MongoDb.ObjectId.createFromHexString(_id)
        if (cart)
            this.cart = cloneDeep(cart)
    }

    cartDefault = { items: [], total: 0 }
    cart = this.cartDefault

    static findAll() {
        return userCollection()
            .then(col => col.find().toArray())
    }

    static findById(id) {
        userCollection()
            .then(col => col.findOne({ _id: MongoDb.ObjectId.createFromHexString(id) }))
    }

    static fromObjet(obj) {
        try {
            const { _id, name, email, cart } = obj
            if (!_id || !name || !email)
                throw Error('Could\'t to cast object to User')
            return new User(name, email, _id, cart)
        }
        catch (err) {
            console.error(err)
        }
    }

    save() {
        if (!this._id)
            return userCollection()
                .then(col => col.insertOne(this))
        else
            return userCollection()
                .then(col => col.updateOne(
                    { _id: this._id },
                    { $set: this }
                ))
    }

    addToCart(prod, qty) {
        if (!prod)
            return Promise.reject('No \'prod\' param\nUser.addToCart() need to pass a \'product\' as a param (prod)')

        qty = +qty || 1
        const cart = this.cart
        const index = cart.items.findIndex(i => {
            if (i._id && prod._id)
                return i._id.toString() === prod._id.toString()
            else {
                log(false)
                return false
            }
        })

        // Not found the product in cart.items
        if (index < 0) {
            cart.items.push({ ...prod, quantity: qty })
        }
        else {
            const fItem = cart.items[index]
            fItem.quantity += qty
        }

        cart.total = +cart.total + (+prod.price * qty)
        return userCollection()
            .then(col =>
                col.updateOne(
                    { _id: this._id },
                    { $set: { cart: cart } }
                )
            )
    }

    resetCart() {
        this.cart = this.cartDefault
        return userCollection()
            .then(col => col.updateOne(
                { _id: this._id },
                { $set: { cart: this.cart } }
            ))
    }

    getCart() {
        return Promise.resolve(this.cart)
    }

    addOrder() {
        const order = { userId: this._id, ...this.cart }
        return orderCollection()
            .then(col => col.insertOne(order))
            .then(doc => {
                this.resetCart().catch(err => error(err))
                return doc
            })
    }

    getOrders() {
        return orderCollection()
            // .then(col => col.find({$where:{userId: this._id}}).toArray())
            .then(col => col.find({'userId': this._id}).toArray())
    }
}
