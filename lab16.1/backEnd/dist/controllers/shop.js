import { log, error } from 'console';
import Product from '../models/mongooseModels/Product.js';
export function getProds(req, res, next) {
    Product.find()
        .then(prods => res.send(prods));
}
export function getCart(req, res, next) {
    const user = req.user;
    user.getCart()
        .then(cart => res.status(200).send(cart))
        .catch((err) => res.status(400).send(err));
}
export function postCart(req, res, next) {
    const { prodId } = req.body;
    const user = req.user;
    Product.findById(prodId)
        .then(prod => {
        if (!prod)
            throw Error(`Not found product with id: ${prodId}`);
        return user.addToCart(prod, 1);
    })
        .then(_ => res.status(200).send(`Added to cart product with id: ${prodId}`))
        .catch(err => {
        error(err);
        res.status(400).send(err);
    });
}
export function getOrders(req, res, next) {
    const user = req.user;
    user.getOrders()
        .then(orders => res.status(200).send(orders))
        .catch(err => res.status(400).send(err));
}
export function postOrder(req, res, next) {
    const user = req.user;
    user.addOrder()
        .then(() => res.status(200).send(`Add order successfully! cart'll be reseted!`))
        .catch(err => {
        error(err);
        res.status(400).send(err);
    });
}
export default {
    getProds, getCart, postCart, getOrders, postOrder
};
