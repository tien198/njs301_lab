
export default interface Cart {
    products: [
        {
            id: string,
            qty: number
        }
    ]
    totalPrice: number
}