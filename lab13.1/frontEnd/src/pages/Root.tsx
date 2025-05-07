import { Outlet } from 'react-router-dom'
import NavBar from '../components/layouts/NavBar'

export default function Root() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}
