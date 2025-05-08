import { Outlet, type RouteObject } from 'react-router-dom'
import { shopRouteURL } from '../utilities/routeUrl'
import { lazy, Suspense } from 'react'
import { Fallback } from '../components/Fallback'

const Login = lazy(() => import('../pages/auth/Login'))
const Signup = lazy(() => import('../pages/auth/Signup'))

const authRoute: RouteObject = {
    path: shopRouteURL.authen,
    element: <><Outlet /></>,
    children: [
        {
            path: shopRouteURL.login,
            element: <Suspense fallback={<Fallback />}>
                <Login />
            </Suspense>
        },
        {
            path: shopRouteURL.signup,
            element: <Suspense fallback={<Fallback />}>
                <Signup />
            </Suspense>
        }
    ]
}

export default authRoute