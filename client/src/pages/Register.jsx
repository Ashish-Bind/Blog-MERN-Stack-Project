import { useState } from 'react'

function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async function (e) {
    e.preventDefault()
    const response = await fetch(`http://localhost:${80}/register`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-type': 'application/json' },
    })
    if (response.status !== 200) alert('Registration Falied')

    alert('User registered')
  }

  return (
    <form className="register" onSubmit={handleRegister}>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Register</button>
    </form>
  )
}

export default Register
