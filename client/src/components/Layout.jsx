import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

function Layout() {
  return (
    <main>
      <Navbar />
      <Outlet />
    </main>
  )
}

export default Layout
