import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './pages/Root'

import shopRoute from './routes/shop'
import adminRoute from './routes/admin'
import Error from './pages/Error'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      shopRoute,
      adminRoute
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
