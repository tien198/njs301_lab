import { lazy, Suspense } from "react";
import { Outlet, RouteObject } from "react-router-dom";
import { Fallback } from "../components/Fallback";

const Product = lazy(() => import('../pages/admin/Products'))
const ProductManipulate = lazy(() => import('../pages/admin/ProductManipulate'))

const adminRoute: RouteObject = {
    path: '/admin',
    element: <>
        <Outlet />
    </>,
    children: [
        {
            path: 'products',
            element: <Suspense fallback={<Fallback />}>
                <Product />
            </Suspense>,
            // loader:
        },
        {
            path: 'add-product',
            element: <Suspense fallback={<Fallback />}>
                <ProductManipulate isEditing={false} />
            </Suspense>,
            action: arg => import('../pages/admin/ProductManipulate').then(i => i.action(arg))
        },
        {
            path: 'edit-product/:prodId',
            element: <Suspense fallback={<Fallback />}>
                <ProductManipulate />
            </Suspense>,
            loader: arg => import('../pages/admin/ProductManipulate').then(i => i.editLoader(arg))
        },
    ]
}

export default adminRoute