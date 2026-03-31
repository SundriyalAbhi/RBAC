import React, { useState } from 'react'
import ForgotPass from './forgotPassword';
import dynamic from 'next/dynamic';


export const MainAuth = () => {
  const [mode, setMode] = useState("signin");
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