import { ActionFunctionArgs, Form, redirect } from "react-router-dom"
import { BackendUrl } from "../../utils/backendUrl"

type Props = {
    prodId: string,
    price: number
}

export default function AddToCart({ prodId, price }: Props) {
    return (
        <Form action="/cart" method="post">
            <button className="btn">Add to cart</button>
            <input type="hidden" name="prodId" value={prodId} />
            <input type="hidden" name="price" value={price} />
        </Form>
    )
}

export async function action(arg: ActionFunctionArgs){
    const formData = Object.fromEntries((await arg.request.formData()).entries())
    
    fetch(BackendUrl.cart, {
        method:'post',
        headers:{
            'content-type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    return redirect('/cart')
}