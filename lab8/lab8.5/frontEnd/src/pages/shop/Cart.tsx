import { ActionFunctionArgs, redirect, useFetcher, useLoaderData } from 'react-router-dom'
import { BackendUrls } from '../../utils/conventionUrl'
import CartModel from '../../models/interfaces/Cart'

// css
import styled from './cart.module.css'


export default function Cart() {
    const cart: CartModel = useLoaderData()
    const fetcher = useFetcher()

    return (
        <main>
            {(cart.products.length > 0) ?
                <>
                    <ul className={styled['cart__item-list']}>
                        {cart.products.map(p =>
                            <li className={styled['cart__item']} key={p.id}>
                                <h1>{p.title}</h1>
                                <h2>Quantity: {p.qty}</h2>
                                <fetcher.Form action='/cart/remove-product' method='POST'>
                                    <input type='hidden' value={p.id} name='prodId' />
                                    <button className='btn danger' type='submit'>Delete</button>
                                </fetcher.Form>
                            </li>
                        )}
                    </ul>
                    <div className='centered'>
                        <fetcher.Form action='/create-order' method='post'>
                            <button className='btn'>Order Now!</button>
                        </fetcher.Form>
                    </div>
                </>
                :
                <h1>No Products in Cart!</h1>
            }
        </main>
    )
}

export async function loader() {
    const res = await fetch(BackendUrls.cart)
    return await res.json()
}

export async function actionAddToCart(arg: ActionFunctionArgs) {
    const formData = Object.fromEntries((await arg.request.formData()).entries())

    await fetch(BackendUrls.addToCart, {
        method: arg.request.method,
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    return redirect('/cart')
}

export async function actionRemoveItem(arg: ActionFunctionArgs) {
    const formData = Object.fromEntries((await arg.request.formData()).entries())
    await fetch(BackendUrls.removeCartItem, {
        method: arg.request.method,
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    return null
}