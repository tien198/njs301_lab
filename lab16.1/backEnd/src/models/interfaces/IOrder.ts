import {Document} from 'mongoose'

export default interface IOrder extends Document{
    items:[]
    total:number
    user: {}
}