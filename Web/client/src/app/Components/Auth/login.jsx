import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bounce, toast } from 'react-toastify';
import { AuthContext } from '@/app/Context/AuthContext';

export const SignIn = ({ setMode }) => {
  const [formData, setFormData] = useState({ role: 'Administrator' }); // default role
  const { Authdispatch, UserSignIn } = useContext(AuthContext);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { companyId, password, role , email} = formData;
      if (companyId && password && role && email) {
        const logindata = await UserSignIn(formData);

        if (logindata.status === 404) {
          toast.error('User does not exist', { position: 'top-center', autoClose: 5000, transition: Bounce });
        } else if (logindata.status === 401) {
          toast.error('Wrong password', { position: 'top-center', autoClose: 5000, transition: Bounce });
        } else if (logindata.status === 200) {
          toast.info('Login successful', { position: 'top-center', autoClose: 5000, transition: Bounce });
          Authdispatch({ type: 'SIGN_IN', payload: logindata.data });
          switch (role) {
            case 'Administrator':
              router.push('/pages/Home');
              break;
            case 'Provider':
              router.push('/provider-dashboard');
              break;
            case 'User':
              router.push('/user-dashboard');
              break;
            default:
              router.push('/pages/Home');
          }
        }
      } else {
        toast.error('Please fill out all fields', { position: 'top-center', autoClose: 5000, transition: Bounce });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <select
              value={formData.role}
              onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            >
              <option value="Administrator">Administrator</option>
              <option value="Provider">CISO</option>
              <option value="User">Data Analyst</option>
             <option value="User">Auditor</option> 
            </select>
          </div>

          <div>
            <input
              type="text"
              placeholder="Enter Company ID"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
              onChange={(e) => setFormData((prev) => ({ ...prev, companyId: e.target.value }))}
            />
          </div>

             <div>
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
              onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
            />
          </div>

          <div className="text-right">
            <button
              type="button"
              className="text-sm text-teal-700 hover:underline"
              onClick={() => setMode('ForgotPass')}
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-700 text-white py-3 rounded-lg hover:bg-teal-800 transition duration-300"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};
