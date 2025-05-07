import { useLoaderData } from 'react-router-dom'
import './product.css'
import Product from '../../models/Product'
import { BackendUrls } from '../../utils/conventionUrl'
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
  const res = await fetch(BackendUrls.baseUrl)
  return res.json()
}