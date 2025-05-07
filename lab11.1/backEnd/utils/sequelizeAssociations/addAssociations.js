const User = require('../../models/user')
const Product = require('../../models/product')
const Cart = require('../../models/cart')
const CartItem = require('../../models/cart-item')
const Order = require('../../models/order')
const OrderItem = require('../../models/order-item')


function userCart() {
    User.hasOne(Cart)
}

function userProducts() {
    User.hasMany(Product)
    Product.belongsTo(User)
}

function cartsProducts() {
    Cart.belongsToMany(Product, { through: CartItem })
    Product.belongsToMany(Cart, { through: CartItem })
}

function usersOrders() {
    User.hasMany(Order)
    // Order.belongsTo(User)
}

function ordersProducts() {
    Order.belongsToMany(Product, { through: OrderItem })
    Product.belongsToMany(Order, { through: OrderItem })
}

module.exports = function () {
    userProducts()

    userCart()
    cartsProducts()

    usersOrders()
    ordersProducts()
}
