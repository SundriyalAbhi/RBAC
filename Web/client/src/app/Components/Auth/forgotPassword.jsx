import React, { useContext, useState } from 'react';
import { Bounce, toast } from 'react-toastify';
import { NewPassword } from './NewPassword';
import { AuthContext } from '@/app/Context/AuthContext';

const ForgotPass = ({ setMode }) => {
  const { findAccount, SENDOTP, VERIFYOTP } = useContext(AuthContext);
  const [data, setFormData] = useState({});
  const [user, setUser] = useState(false);
  const [email, setEmail] = useState('');
  const [passwordInp, setPasswordInp] = useState(false);
  const [showInput, setShowInput] = useState(false);

  const findUserAccount = async (body) => {
    try {
      const data = await findAccount(body);
      const resolveAfter3Sec = new Promise((resolve, reject) => {
        setTimeout(() => {
          if (data.email) {
            setEmail(data.email);
            setUser(true);
            resolve();
          } else reject();
        }, 3000);
      });

      toast.promise(resolveAfter3Sec, {
        pending: 'Finding Account...',
        success: 'Account found successfully 👌',
        error: '"User Not Found" 🤯',
      });
    } catch (error) {
      console.log(error);
      toast.error('An error occurred while finding the account.');
    }
  };

  const OTPHandler = async (body) => {
    try {
      const data = await SENDOTP(body);
      const resolveAfter2Sec = new Promise((resolve, reject) => {
        setTimeout(() => {
          if (data.Status === 'OTP Sent Successfully') {
            setShowInput(true);
            resolve();
          } else reject();
        }, 2000);
      });

      toast.promise(resolveAfter2Sec, {
        pending: 'Sending OTP...',
        success: 'OTP Sent successfully 👌',
        error: 'Error sending OTP 🤯',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const VERIFYOTPHandler = async (body) => {
    try {
      const data = await VERIFYOTP(body);
      const resolveAfter3Sec = new Promise((resolve, reject) => {
        setTimeout(() => {
          if (data.msg === 'OTP verified successfully') {
            setPasswordInp(true);
            resolve();
          } else reject();
        }, 3000);
      });

      toast.promise(resolveAfter3Sec, {
        pending: 'Verifying OTP...',
        success: `${data.msg} 👌`,
        error: `${data.msg} 🤯`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (passwordInp) return <NewPassword setMode={setMode} Email={email} />;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">
        {user ? (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">{email}</h2>
            <p className="text-sm text-center text-gray-500 mb-6">Enter the OTP sent to your email</p>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {showInput && (
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    onChange={(e) => setFormData((prev) => ({ ...prev, OTP: e.target.value }))}
                  />
                  <button
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    onClick={() => VERIFYOTPHandler({ email, otp: data.OTP })}
                  >
                    Submit
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                onClick={() => OTPHandler({ UserEmail: email })}
              >
                {showInput ? 'Resend OTP' : 'Send OTP'}
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800">Find Your Account</h2>
            <p className="text-sm text-center text-gray-500 mt-2 mb-6">Enter your registered email</p>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter Email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                onClick={() => findUserAccount(data)}
              >
                Continue
              </button>
            </form>
          </>
        )}

        <button
          className="text-teal-700 text-center mt-6 w-full hover:underline"
          onClick={() => setMode('signin')}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default ForgotPass;
