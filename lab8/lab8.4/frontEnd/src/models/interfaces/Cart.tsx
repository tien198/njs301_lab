import IProduct from "./IProduct"

interface CartItem extends IProduct {
    qty: number
}

export default interface Cart {
    products: CartItem[]
    totalPrice: number
}