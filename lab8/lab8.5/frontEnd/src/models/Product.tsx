import IProduct from "./interfaces/IProduct"

export default class Product implements IProduct {
    constructor(
        public title: string,
        public imageUrl: string,
        public description: string,
        public price: number,
        public id: string
    ) { }

    static fromObj(obj:object){
        const prod = new Product('','','',0,'')
        Object.assign(prod, obj)
        prod.price = +prod.price
        return prod
    }
}