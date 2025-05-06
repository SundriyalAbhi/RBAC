import React, { useContext, useState } from 'react';
import { Bounce, toast } from 'react-toastify';
import '@/app/style.css';
import { AuthContext } from '@/app/Context/AuthContext';

export const SignUp = ({ setMode }) => {
  const [formData, setFormData] = useState({});
  const { UserSignUp, SENDOTP, VERIFYOTP } = useContext(AuthContext);
  const [enterOtp, setEnterOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (formData?.username && formData?.email && formData?.password && formData?.confirmPassword) {
      if (formData.password === formData.confirmPassword) {
        try {
          setLoading(true);
          const data = await SENDOTP({ UserEmail: formData.email });

          const resolveAfter3Sec = new Promise((resolve, reject) => {
            setTimeout(() => {
              if (data.Status === 'OTP Sent Successfully') {
                setEnterOtp(true);
                resolve();
              } else {
                reject();
              }
            }, 2000);
          });

          toast.promise(resolveAfter3Sec, {
            pending: 'Sending OTP...',
            success: 'OTP sent successfully 👌',
            error: 'Error sending OTP 🤯',
          });
        } catch (error) {
          console.error(error);
          toast.error('Failed to send OTP', { position: 'top-center' });
        } finally {
          setLoading(false);
        }
      } else {
        toast.error("Passwords don't match", {
          position: 'top-center',
          autoClose: 5000,
          theme: 'light',
          transition: Bounce,
        });
      }
    } else {
      toast.error('Please fill out the form', {
        position: 'top-center',
        autoClose: 5000,
        theme: 'light',
        transition: Bounce,
      });
    }
  }

  async function handleVerifyOtp(e) {
    e.preventDefault();
    try {
      const verified = await VERIFYOTP({ otp: otp, email: formData.email });

      const resolveAfter3Sec = new Promise(async (resolve, reject) => {
        setTimeout(async () => {
          if (verified.msg === 'OTP verified successfully') {
            const status = await UserSignUp(formData);
            if (status === 200) {
              toast.success('SignUp successful!', {
                position: 'top-center',
                autoClose: 3000,
                theme: 'light',
                transition: Bounce,
              });
              setTimeout(() => setMode('signin'), 3000);
              resolve();
            } else {
              toast.error('Signup failed!', { position: 'top-center', autoClose: 3000 });
              reject();
            }
          } else {
            reject();
          }
        }, 3000);
      });

      toast.promise(resolveAfter3Sec, {
        pending: 'Verifying OTP...',
        success: `${verified.msg} 👌`,
        error: `${verified.msg || 'OTP verification failed'} 🤯`,
      });
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong during OTP verification');
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {enterOtp ? (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4 text-center">Enter OTP</h2>
          <p className="text-center text-sm text-gray-500 mb-4">OTP sent to: <strong>{formData.email}</strong></p>
          <form onSubmit={handleVerifyOtp}>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full p-3 mb-4 border rounded-lg"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button type="submit" className="w-full py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
              Verify OTP
            </button>
          </form>
        </div>
      ) : (
        <>
          <div className="flex justify-items-center items-center mr-5" style={{ width: '600px', height: '48vh' }}>
            <h1 className="text-slate-900 font-bold self-center" style={{ fontSize: '40px' }}>
              "Eager to join the cyber security conversation? Sign up now!"
            </h1>
          </div>
          <div className="bg-slate-200 p-8 rounded-2xl shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {['username', 'email', 'password', 'confirmPassword'].map((field, idx) => (
                <input
                  key={idx}
                  type={field.includes('password') ? 'password' : 'text'}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  onChange={(e) => setFormData((prev) => ({ ...prev, [field]: e.target.value }))}
                  required
                />
              ))}

              <label className="block text-gray-700">Profile Picture</label>
              <div className="border-2 border-teal-300 border-dashed p-4 rounded-lg text-center cursor-pointer hover:border-teal-500">
                <input
                  type="file"
                  className="w-full p-2 rounded-lg"
                  onChange={(e) => {
                    if (e.target.files.length > 0) {
                      const fileReader = new FileReader();
                      fileReader.onload = (event) =>
                        setFormData((prev) => ({ ...prev, ProfilePicture: event.target.result }));
                      fileReader.readAsDataURL(e.target.files[0]);
                    }
                  }}
                />
              </div>

              {formData.ProfilePicture && (
                <img
                  src={formData.ProfilePicture}
                  alt="Profile"
                  className="mx-auto mt-4 w-32 h-32 rounded-full object-cover"
                />
              )}

              <button
                type="submit"
                className="w-full py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </form>
            <button
              onClick={() => setMode('signin')}
              className="mt-4 w-full text-teal-600 hover:underline"
            >
              Already have an account? Sign In
            </button>
          </div>
        </>
      )}
    </div>
  );
};
