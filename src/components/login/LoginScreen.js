import React from 'react'
import { useNavigate } from 'react-router-dom';

export const LoginScreen = () => {

  const navigate = useNavigate();

   const handleLogin = ()=>{
      console.log('handleLogin');
      navigate('/marvel', {
         replace: true // remplaza la historia para que no sea posible volver al url anterior (login)
      })
   }

   return (
      <div className='container mt-5'>
         <h1>Login</h1>
         <hr/>

         <button onClick={handleLogin} className='btn btn-primary'>Login</button>
         
      </div>
   )
}
