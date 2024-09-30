import React from 'react'

function Register() {
  return (
    <>
    <h2>Register Here</h2>

    <input
    type='text'
    placeholder='Enter your name'
    />
    <br/>
    <input
    type='email'
    placeholder='Enter your email'
    />
    <br/>
    <input
    type='phone'
    placeholder='Enter your phone number'
    />
    <br/>
    <input
    type='text'
    placeholder='Enter your city'
    />
    <br/>
    <input
    type='Password'
    placeholder='Enter your password'
    />
    <br/>
    <input
    type='password'
    placeholder='Confirm your password'
    />
    <br/>
    <button>Register</button>

    </>
    
  )
}

export default Register