const { log, error } = require('console')
const { cloneDeep } = require('lodash')

const Product = require('../models/product')
// const Cart = require('../models/cart')
// const CartItem = require('../models/cart-item')

exports.getProds = (req, res, next) => {
    Product.findAll()
        .then(prods => res.send(prods))
}

exports.getCart = (req, res, next) => {
    const user = req.user
    user.getCart()
        .then(cart => cart.getProducts())
        .then(prods => {
            const resProds = prods.map(i => i.dataValues)
            res.status(200).send(resProds)
        })
        .catch(err => error(err))
}

exports.postCart = (req, res, next) => {
    const { prodId } = req.body
    const user = req.user

    let fetCart
    let qty
    Cart.findAll({ where: { userId: user.id } })
        .then(carts => {
            fetCart = carts[0]
            if (fetCart)
                return fetCart
            else
                return user.createCart()
                    .then(cart => cart)
        })
        .then(cart => cart.getProducts({ where: { id: +prodId } }))
        .then(prods => {
            const fProd = prods[0]
            if (fProd) {
                qty = fProd.cartItem.quantity + 1
                return fProd
            }
            else {
                return Product.findByPk(prodId)
                    .then(prod => {
                        if (prod) {
                            qty = 1
                            return prod
                        }
                        else
                            throw Error(`Not found product with id ${prodId} in database!`)
                    })
            }
        })
        .then(prod => {
            fetCart.addProduct(prod, { through: { quantity: qty } })
                .catch(err => {
                    error('___ ERROR MAY LEAD TO LOSE THE INTEGRITY OF DATA!')
                    error(err)
                })
            fetCart.total += +prod.price
            fetCart.save()
                .catch(err => {
                    error('___ ERROR MAY LEAD TO LOSE THE INTEGRITY OF DATA!')
                    error(err)
                })
        })
        .catch(err => error(err))
}

exports.getOrders = (req, res, next) => {
    const user = req.user
}

exports.postOrder = (req, res, next) => {
    const user = req.user
    let fetCart
    let orProds
    user.getCart()
        .then(cart => {
            fetCart = cart
            return cart.getProducts()
        })
        .then(prods => {
            orProds = prods.map(prod => {
                prod.orderItem = { quantity: prod.cartItem.quantity }
                return prod
            })

            return user.createOrder()
        })
        .then(order => {
            order.addProducts(orProds)
                .catch(err => error(err))

            order.total = fetCart.total
            order.save()
                .catch(err => error(err))
        })
        .then(() => fetCart.setProducts([]))
        .catch(err => error(err))
}