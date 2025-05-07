
export default function Cart() {
    return (
        <main>
            {/* {(products.length > 0) ?
                <>
                    <ul className="cart__item-list">
                        {products.map(p =>
                            <li className="cart__item">
                                <h1>{p.productId.title}</h1>
                                <h2>Quantity: {p.quantity}</h2>
                                <form action="/cart-delete-item" method="POST">
                                    <input type="hidden" value={p.productId._id} name="productId"/>
                                        <button className="btn danger" type="submit">Delete</button>
                                </form>
                            </li>
                        )}
                    </ul>
                    <div className="centered">
                        <form action="/create-order" method="post">
                            <button className="btn">Order Now!</button>
                        </form>
                    </div>
                </>
                :
                <h1>No Products in Cart!</h1>
            } */}
        </main>
    )
}

export function loader(){
    
}