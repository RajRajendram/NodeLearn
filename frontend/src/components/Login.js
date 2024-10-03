import React from 'react'
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const Login = () =>{
  const {login} = useContext(AuthContext);
  const [email, setEmail] =useState('');
  const [password, setPassword] = useState('');

  const handleSumit = async(e) => {
    e.preventDefault();
    await login(email, password);
  }

  return (
    <div>
    <h2>Login Here</h2>
        <form onSubmit={handleSumit}>
        <input
        type='email'
        placeholder='Enter your email'
        value={email}
        onChange={(e)=> setEmail(e.target.value)}
        />
        <br/>
        <input
        type='password'
        placeholder='Enter your password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <br/>
        <button type='submit'>Login</button>
        </form>

    </div>
  )
}


export default Login