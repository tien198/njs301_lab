import { useLoaderData } from "react-router-dom"
import Product from "../../models/Product"
import { BackendUrl } from "../../utils/conventionUrl"

export default function Products() {
  const prods: Product[] = useLoaderData()
  return (
    <main>
      {prods.length > 0 ?
        <div className="grid">
          {
            prods.map(product =>
              <article className="card product-item">
                <header className="card__header">
                  <h1 className="product__title">
                    {product.title}
                  </h1>
                </header>
                <div className="card__image">
                  <img src={product.imageUrl} alt={product.title} />
                </div>
                <div className="card__content">
                  <h2 className="product__price">$
                    {product.price}
                  </h2>
                  <p className="product__description">
                    {product.description}
                  </p>
                </div>
                <div className="card__actions">
                  <a href={`/admin/edit-product/${product.id}`} className="btn">Edit</a>
                  <form action="/admin/delete-product" method="post">
                    <input type="hidden" name="prodId" value={product.id} />
                    <button className="btn" type="submit">Delete</button>
                  </form>
                </div>
              </article>
            )
          }
        </div>
        : <h1>No Products Found!</h1>
      }
    </main>
  )
}

export function loader() {
  return fetch(BackendUrl.baseUrl)
    .then(res => res.json())
    .catch(err => console.error(err))
}