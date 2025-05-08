import { lazy, Suspense } from "react";
import { Outlet, type RouteObject } from "react-router-dom";
import { Fallback } from "../components/Fallback";
import { shopRouteURL } from "../utilities/routeUrl";

const Product = lazy(() => import('../pages/admin/Products'))
const AddProduct = lazy(() => import('../pages/admin/AddProduct'))
const EditProduct = lazy(() => import('../pages/admin/EditProduct'))

const adminRoute: RouteObject = {
    path: shopRouteURL.admin,
    element: <>
        <Outlet />
    </>,
    children: [
        {
            path: shopRouteURL.products,
            element: <Suspense fallback={<Fallback />}>
                <Product />
            </Suspense>,
            // loader:
        },
        {
            path: shopRouteURL.addProduct,
            element: <Suspense fallback={<Fallback />}>
                <AddProduct isEditing={false} />
            </Suspense>,
            action: (arg) => import('../pages/admin/AddProduct').then(i => i.action(arg))
        },
        {
            path: shopRouteURL.editProduct,
            element: <Suspense fallback={<Fallback />}>
                <EditProduct />
            </Suspense>,
            // loader:
        },
    ]
}

export default adminRoute