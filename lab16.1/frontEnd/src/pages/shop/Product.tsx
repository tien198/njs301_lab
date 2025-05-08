import { useLoaderData } from 'react-router-dom'
import './product.css'
import Product from '../../models/Product'
import { BackendUrl } from '../../utilities/backendUrl'
import ProductComponent from '../../components/ProductComponent'

export default function ProductPage() {
  const prods: Product[] = useLoaderData()
  return (
    <main>
      {
        (prods.length > 0) ?
          <div className="grid">
            {
              prods.map(product =>
                <ProductComponent product={product} key={product.title} />
              )
            }
          </div>
          : <h1>No Products Found!</h1>
      }
    </main>
  )
}

export async function productLoader() {
  try {
    const res = await fetch(BackendUrl.baseUrl)
    return res.json()
  } catch (error) {
    console.error(error)
    return []
  }
}