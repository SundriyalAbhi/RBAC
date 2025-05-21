import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bounce, toast } from 'react-toastify';
import '@/app/style.css';
import { AuthContext } from '@/app/Context/AuthContext';

export const SignIn = ({ setMode }) => {
  const [formData, setFormData] = useState({});
  const [isClient, setIsClient] = useState(false); 
  const { Authdispatch, ProviderSignIn } = useContext(AuthContext);
  const router = useRouter();

    useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (formData?.email && formData?.password) {
        const logindata = await ProviderSignIn(formData);
        if (logindata.status === 404) {
          toast.error('User does not exist', { position: 'top-center', autoClose: 3000, transition: Bounce });
        } else if (logindata.status === 401) {
          toast.error('Wrong password', { position: 'top-center', autoClose: 3000, transition: Bounce });
        } else if (logindata.status === 200) {
          toast.info('Login successful', { position: 'top-center', autoClose: 3000, transition: Bounce });
          Authdispatch({ type: 'SIGN_IN', payload: logindata.data });
          router.push('/Pages/Home');
        }
      } else {
        toast.error('Please fill out the form', { position: 'top-center', autoClose: 3000, transition: Bounce });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-100"
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-100"
            onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
          />
          <div className="flex justify-between text-sm">
            <button
              type="button"
              className="text-blue-500 hover:underline"
              onClick={() => setMode('ForgotPass')}
            >
              Forgot Password?
            </button>
            <button
              type="button"
              className="text-blue-500 hover:underline"
              onClick={() => setMode('signup')}
            >
              Don't have an account?
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};
