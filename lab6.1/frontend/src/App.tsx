import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy, Suspense } from 'react'

import Root from './pages/Root'

const Home = lazy(() => import('./pages/index'))
const User = lazy(() => import('./pages/users/Index'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    action: (args) => import('./pages/index').then(i => i.addUserAction(args)),
    children: [
      {
        index: true,
        element: <Suspense>
          <Home />
        </Suspense>,
      },
      {
        path: '/users',
        element: <Suspense>
          <User />
        </Suspense>,
        loader: () => import('./pages/users/Index').then(i => i.userLoader())
      },
    ]
  }
])

const App = () => <RouterProvider router={router} />

export default App
