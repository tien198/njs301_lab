import { useLoaderData } from 'react-router-dom'
import { BackendUrl } from '../../utils/backendUrl'
import CartModel from '../../models/interfaces/Cart'

// css
import styled from './cart.module.css'


export default function Cart() {
    const cart: CartModel = useLoaderData()
    return (
        <main>
            {(cart.products.length > 0) ?
                <>
                    <ul className={styled['cart__item-list']}>
                        {cart.products.map(p =>
                            <li className={styled['cart__item']}>
                                <h1>{p.title}</h1>
                                <h2>Quantity: {p.qty}</h2>
                                <form action='/cart-delete-item' method='POST'>
                                    <input type='hidden' value={p.id} name='productId' />
                                    <button className='btn danger' type='submit'>Delete</button>
                                </form>
                            </li>
                        )}
                    </ul>
                    <div className='centered'>
                        <form action='/create-order' method='post'>
                            <button className='btn'>Order Now!</button>
                        </form>
                    </div>
                </>
                :
                <h1>No Products in Cart!</h1>
            }
        </main>
    )
}

export async function loader() {
    const { baseUrl, cart } = BackendUrl
    const res = await fetch(baseUrl + cart)
    return await res.json()
}