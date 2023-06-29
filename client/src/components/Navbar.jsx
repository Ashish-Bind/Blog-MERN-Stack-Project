import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './UserContext'

function Navbar() {
  const { userInfo, setUserInfo } = useContext(UserContext)
  useEffect(() => {
    fetch(` http://localhost:${80}/profile`, { credentials: 'include' }).then(
      (res) =>
        res.json().then((userInfo) => {
          setUserInfo(userInfo)
        })
    )
  }, [])

  const handleLogout = function () {
    fetch(` http://localhost:${80}/logout`, {
      credentials: 'include',
      method: 'POST',
    })
    setUserInfo(null)
  }

  const username = userInfo?.username

  return (
    <header>
      <Link to="/" className="logo">
        Memo
      </Link>
      <nav>
        {username && (
          <>
            <span className="user-name">Hello, {username} 😄</span>
            <Link to="/create" className="nav-btn">
              Create new Post
            </Link>
            <a
              onClick={() => {
                handleLogout()
              }}
              className="nav-btn"
            >
              Logout
            </a>
          </>
        )}
        {!username && (
          <>
            <Link className="nav-btn" to="/login">
              Login
            </Link>
            <Link className="nav-btn" to="/register">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  )
}

export default Navbar
