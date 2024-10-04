import React, { useState } from 'react'
import { toast } from 'react-toastify';
import axiosInstance from '../api/api';

const  Register = () => {
  const [formData, setFormData] = useState({
    name:'',
    email:'',
    phone:'',
    city:'',
    password:'',
    confirmPassword:''
  })

  const handleSumit = async (e) => {
    e.preventDefault();

    if(formData.password !== formData.confirmPassword){
      toast.error('Password do not match');
      return;
    }
    try{
      await axiosInstance.post('/user/register', formData);
      toast.success('Registration sucessfull');
    }catch(error){
      toast.error(error);
    }
  }

  return (
    <>
    <h2>Register Here</h2>

    <form onSubmit={handleSumit}>
    <input
    type='text'
    placeholder='Enter your name'
    value={formData.name}
    onChange={(e) => setFormData({...formData, name:e.target.value})}
    />
    <br/>
    <input
    type='email'
    placeholder='Enter your email'
    value={formData.email}
    onChange={(e) => setFormData({...formData, email:e.target.value})}
    />
    <br/>
    <input
    type='phone'
    placeholder='Enter your phone number'
    value={formData.phone}
    onChange={(e) => setFormData({...formData, phone:e.target.value})}
    />
    <br/>
    <input
    type='text'
    placeholder='Enter your city'
    value={formData.city}
    onChange={(e) => setFormData({...formData, city:e.target.value})}
    />
    <br/>
    <input
    type='Password'
    placeholder='Enter your password'
    value={formData.password}
    onChange={(e) => setFormData({...formData, password:e.target.value})}
    />
    <br/>
    <input
    type='password'
    placeholder='Confirm your password'
    value={formData.confirmPassword}
    onChange={(e) => setFormData({...formData, confirmPassword:e.target.value})}
    />
    <br/>
    <button type='submit'>Register</button>
    </form>

    </>
    
  )
}

export default Register