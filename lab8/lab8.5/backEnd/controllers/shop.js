const { log } = require('console')

const Product = require('../models/Product')
const Cart = require('../models/Cart')

exports.getProds = (req, res, next) => {
    Product.find(data =>
        res.send(data)
    )
}

exports.getProd = (req, res, next) => {
    const prodId = req.params.prodId
    Product.findById(prodId, prod =>
        res.send(prod)
    )
}

exports.getCart = (req, res, next) => {
    Cart.readCart(true, cart => {
        res.send(cart)
    })
}

exports.postAddToCart = (req, res, next) => {
    const prodId = req.body.prodId
    const price = req.body.price
    Cart.addProduct(prodId, price, () => {
        res.send(301)
    })
}

exports.postRemoveCartItem=(req,res,next)=>{
    const prodId = req.body.prodId
    Cart.removeProduct(prodId, ()=>{
        res.send(301)
    })
}