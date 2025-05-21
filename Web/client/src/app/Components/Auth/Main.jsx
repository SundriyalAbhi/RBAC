import React, { useState } from 'react'
import { SignUp } from './SignUp'
import { SignIn } from './login'
import ForgotPass from './forgotPassword';
import dynamic from 'next/dynamic';


export const MainAuth = () => {
  const [mode, setMode] = useState("signin"); // Single state for all modes
  const NoSSRSignIn = dynamic(() =>
    import('@/app/Components/Auth/login').then(mod => mod.SignIn), {
    ssr: false,
  });
  
  return (
    <>
    
      <div className='' style={{ height: "100vh",  backgroundColor: "#f7f7f7"}}>
        {mode === "signin" ? <NoSSRSignIn setMode={setMode}/> :<ForgotPass setMode={setMode}/> }
        
      </div>
    </>
  );
}