import mongoose, { Schema } from 'mongoose';
import { cloneDeep } from 'lodash';
import Order from './Order.js';
const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    cart: {
        items: [
            {
                product: { type: Schema.Types.ObjectId, ref: 'Product' },
                quantity: { type: Number, default: 1 }
            }
        ],
        total: {
            type: Number,
            default: 0
        },
    }
});
userSchema.methods = {
    getCart() {
        return this.populate('cart.items.product')
            .then(user => user.cart);
    },
    addToCart(prod, quantity) {
        const cart = this.cart;
        const item = cart.items.find(i => {
            if (!i.product)
                return false;
            return i.product.toString() === prod._id.toString();
        });
        if (item)
            item.quantity += +quantity;
        else
            cart.items = [
                ...cloneDeep(this.cart.items),
                {
                    product: prod._id,
                    quantity: +quantity
                }
            ];
        cart.total += (+prod.price * +quantity);
        return this.updateOne({ cart: cart });
    },
    addOrder() {
        return this.getCart()
            .then(cart => {
            return Order.create({
                items: cart.items,
                total: cart.total,
                user: {
                    _id: this._id,
                    name: this.name
                }
            });
        })
            .then(_ => {
            this.cart = {};
            return this.updateOne({ cart: {} });
        });
    },
    getOrders() {
        return Order.find({ 'user._id': this._id });
    }
};
export default mongoose.model('User', userSchema);
