import React from 'react'

function Login() {
  return (
    <div>
        <h2>Login Here</h2>

        <input
        type='email'
        placeholder='Enter your email'
        />
        <br/>
        <input
        type='password'
        placeholder='Enter your password'
        />
        <br/>
        <button>Login</button>

    </div>
  )
}

export default Login