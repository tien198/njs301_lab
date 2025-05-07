import Product from "../../models/Product"
import { BackendUrl } from "../../utils/backendUrl"
import { ActionFunctionArgs, Form, LoaderFunctionArgs, redirect, useLoaderData } from "react-router-dom"

import './forms.css'

type Props = { isEditing?: boolean }

export default function ProductManipulate({ isEditing = false }: Props) {
  const prod = useLoaderData()
  
  return (
    <main>
      <Form className="product-form" method="POST">
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title"  defaultValue={prod?.title}/>
        </div>
        <div className="form-control">
          <label htmlFor="imageUrl">Image URL</label>
          <input type="text" name="imageUrl" id="imageUrl" defaultValue={prod?.imageUrl} />
        </div>
        <div className="form-control">
          <label htmlFor="price">Price</label>
          <input type="number" name="price" id="price" step="0.01" defaultValue={prod?.price} />
        </div>
        <div className="form-control">
          <label htmlFor="description">Description</label>
          <textarea name="description" id="description" rows={5} defaultValue={prod?.description}></textarea>
        </div>

        {isEditing && <input type="hidden" name="id" value={prod?.id} />}
        <button className="btn" type="submit">{isEditing ? 'Update product' : 'Add product'}</button>
      </Form>
    </main>
  )
}

export async function action(arg: ActionFunctionArgs) {
  const data = Object.fromEntries((await arg.request.formData()).entries())

  await fetch(BackendUrl.addProduct, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(Product.fromObj(data))
  })
  return redirect('/')
}

export async function editLoader(arg: LoaderFunctionArgs) {
  const res = await fetch(BackendUrl.findProductById + '/' + arg.params.prodId)
  return await res.json() 
}