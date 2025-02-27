// import axios from "axios";

// export const axiosInstance = axios.create({
//   baseURL: "http://localhost:5000", // Explicitly set backend URL
//   headers: {
//     authorization: `Bearer ${localStorage.getItem("token")}`,
//   },
// });

import axios from "axios";

// export const axiosInstance = axios.create({
//   baseURL: "/process.env.BACKEND_URL", // Explicitly set backend URL
// });

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // Use environment variable correctly
});

// Automatically attach latest token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
