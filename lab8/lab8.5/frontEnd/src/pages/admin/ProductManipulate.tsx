import Product from "../../models/Product"
import { BackendUrl } from "../../utils/conventionUrl"
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
          <input type="text" name="title" id="title" defaultValue={prod?.title} />
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
  const {
    baseUrl,
    editProduct: editProductUrl,
    addProduct: addProductUrl
  } = BackendUrl
  const formData = Object.fromEntries((await arg.request.formData()).entries())
  const isEditing = arg.request.url.includes(editProductUrl)

  const url = isEditing ? editProductUrl : addProductUrl
  const backendUrl = baseUrl + url
  
  await fetch(backendUrl, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(Product.fromObj(formData))
  })
  return redirect('/admin/products')
}

export async function editLoader(arg: LoaderFunctionArgs) {
  const { baseUrl, findProductById } = BackendUrl
  const res = await fetch(baseUrl + findProductById + '/' + arg.params.prodId)
  return await res.json()
}