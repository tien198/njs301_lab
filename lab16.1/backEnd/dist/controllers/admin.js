import { error } from 'console';
import Product from '../models/mongooseModels/Product.js';
export function postAddProduct(req, res, next) {
    const { title, price, imageUrl, description } = req.body;
    const prod = new Product({ title, price, imageUrl, description });
    prod.save()
        .then(() => res.status(201).send('add-product complete!'))
        .catch(err => { error(err); res.status(400).send(err); });
}
export function getFindAll(req, res, next) {
    Product.find()
        .then(prods => res.status(200).send(prods))
        .catch(err => { error(err); res.status(400).send(err); });
}
export function getFindById(req, res, next) {
    const { prodId } = req.params;
    Product.findById(prodId)
        .then(prod => res.send(prod))
        .catch(err => { error(err); res.status(400).send(err); });
}
export async function postEditProduct(req, res, next) {
    const { prodId, title, price, imageUrl, description } = req.body;
    if (!prodId) {
        return res.status(400).send(`'/admin/edit-product' request require 'prodId' property!`);
    }
    try {
        await Product.findByIdAndUpdate(prodId, { title, price, imageUrl, description });
        res.status(200).send(`updated successfully, product with id: '${prodId}'`);
    }
    catch (err) {
        error(err);
        res.status(400).send(err);
    }
}
export function postDeleteProduct(req, res, next) {
    const { prodId } = req.body;
    Product.findByIdAndDelete(prodId)
        // Product.deleteById(prodId)
        //     .then(deleted => {
        //         let result = `Product with id: '${prodId}' was deleted`
        //         if (deleted.deletedCount === 0) {
        //             result = `Not found product with id: '${prodId}' to delete!`
        //             return res.status(404).send(result)
        //         }
        //         
        //     })
        .then(deleted => {
        let result = `Product with id: '${prodId}' was deleted`;
        if (!deleted)
            result = `Not found product with id: '${prodId}' to delete!`;
        return res.status(404).send(result);
    })
        .catch(err => { error(err); res.status(400).send(err); });
}
export default {
    postAddProduct, getFindAll, getFindById, postEditProduct, postDeleteProduct
};
