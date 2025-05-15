import { AuthContext } from '@/app/Context/AuthContext';
import React, { useContext, useState } from 'react'

export default function Login() {
  const [formData , setFormData] = useState();
  const {ProviderSignIn} = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();
 
    try {
      if(formData?.email && formData?.password){
        const logindata = await ProviderSignIn(formData)
        if(logindata){
          console.log(logindata);
          
        }
      }
      
    } catch (error) {
      console.log(error);
      
    }

  }
  return (
    <div>
      <h2>Login </h2>
      <form onSubmit={handleSubmit} >
      
        <input
          type="email"
          placeholder="Email"
          onChange={(e)=>{
            setFormData((prev)=>({...prev,email:e.target.value}))
          }}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e)=>{
            setFormData((prev)=>({...prev,password:e.target.value}))
          }}
        />
      
        <button type="submit">Login</button>
      </form>
      <p>
        Already have an account? <button>Login</button>
      </p>
    </div>
  );
}
