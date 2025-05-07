import { lazy, Suspense } from "react"
import { Fallback } from "../components/Fallback"
import { Outlet, RouteObject } from "react-router-dom"
import { FrontendRoutes } from "../utils/conventionUrl"

const Product = lazy(() => import('../pages/shop/Product'))
const Cart = lazy(() => import('../pages/shop/Cart'))
const Order = lazy(() => import('../pages/shop/Order'))

const shopRoute: RouteObject = {
    path: '/',
    element: <>
        <Outlet />
    </>,
    children: [
        {
            index: true,
            element: <Suspense fallback={<Fallback />}>
                <Product />
            </Suspense>,
            loader: () => import('../pages/shop/Product').then(i => i.productLoader())
        },
        {
            path: FrontendRoutes.products,
            element: <Suspense fallback={<Fallback />}>
                <Product />
            </Suspense>,
            // loader:
        },
        {
            path: FrontendRoutes.cart,
            element: <Suspense fallback={<Fallback />}>
                <Cart />
            </Suspense>,
            loader: () => import('../pages/shop/Cart').then(i => i.loader()),
        },
        {
            path: FrontendRoutes.addToCart,
            action: (arg) => import('../pages/shop/Cart').then(i => i.actionAddToCart(arg))
        },
        {
            path: FrontendRoutes.removeCartItem,
            action: (arg) => import('../pages/shop/Cart').then(i => i.actionRemoveItem(arg))
        },
        {
            path: FrontendRoutes.order,
            element: <Suspense fallback={<Fallback />}>
                <Order />
            </Suspense>,
            // loader:
        },
    ]
}

export default shopRoute