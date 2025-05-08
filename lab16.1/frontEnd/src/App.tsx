import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './pages/Root'

import shopRoute from './routes/shop'
import adminRoute from './routes/admin'
import authRoute from './routes/auth'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      authRoute,
      shopRoute,
      adminRoute
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
