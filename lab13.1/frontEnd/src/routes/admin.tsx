import { lazy, Suspense } from "react";
import { Outlet, RouteObject } from "react-router-dom";
import { Fallback } from "../components/Fallback";

const Product = lazy(() => import('../pages/admin/Products'))
const AddProduct = lazy(() => import('../pages/admin/AddProduct'))
const EditProduct = lazy(() => import('../pages/admin/EditProduct'))

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
                <AddProduct isEditing={false} />
            </Suspense>,
            action: (arg) => import('../pages/admin/AddProduct').then(i => i.action(arg))
        },
        {
            path: 'edit-product',
            element: <Suspense fallback={<Fallback />}>
                <EditProduct />
            </Suspense>,
            // loader:
        },
    ]
}

export default adminRoute