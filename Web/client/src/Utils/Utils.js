import axios from "axios"
const baseURL = process.env.NEXT_PUBLIC_API_URL||"http://localhost:8087"
const API = axios.create({baseURL:baseURL})

export{axios,API,baseURL}


// import { toast } from 'react-toastify';

// const API = axios.create({
//   baseURL: 'https://your-api.com/api',
//   withCredentials: true, // if using cookies
// });

// // 🔐 Request Interceptor (Optional - for auth headers)
// API.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token'); // or your token storage
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // ❌ Response Interceptor for Errors
// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const message = error?.response?.data?.error || "Something went wrong";
//     toast.error(message); // 🔥 show toast error globally
//     return Promise.reject(error); // still let you catch it manually if needed
//   }
// );

// export default API;
