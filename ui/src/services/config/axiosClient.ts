import { BASE_URL } from "@/lib/utils";
import axios from "axios";

// Create a separate axios instance for refresh requests to avoid interceptor loops
// const refreshClient = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true,
// });

export const client = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // this should used only with logout to send the cookie , you can use the refresh client
});


// // Request interceptor
// client.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     const token = TokenService.getAccessToken();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   error => Promise.reject(error)  // what does this line
// );


// function isTokenValid(bearerToken: string): boolean {
//   try {
//     if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
//       return false;
//     }

//     const token = bearerToken.split(' ')[1];
//     const payloadBase64 = token.split('.')[1];
//     const payloadJson = atob(payloadBase64);
//     const payload = JSON.parse(payloadJson);

//     const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

//     return payload.exp > currentTime;
//   } catch (error) {
//     // If any error occurs (invalid format, decoding issue), consider token invalid
//     return false;
//   }
// }


// // Add a response interceptor
// client.interceptors.response.use(
//   function (response) {
//     //console.log("response : "+response.headers)
//     return response;
//   },
 
//   async function (error: AxiosError) {
//     const originalRequest: any = error.config;
//      const bearerToken = error.config.headers.Authorization;
//     // You can add a 401 condition here if you want to refresh only on authorization failures
//     if (error.message === 'Network Error' && !originalRequest._retry && !isTokenValid(bearerToken)) {
//       originalRequest._retry = true;

//       try {
//         // Use refreshClient here
//         const response = await refreshClient.post('/auth/refresh');
//         console.log(response.data.data.access_token)
//         if (response) {
//           // Save the new access token
//           TokenService.setAccessToken(response.data.data.access_token)

//           // Update the authorization header for the retried request
//           originalRequest.headers['Authorization'] = `Bearer ${response.data.data.access_token}`;

//           // Retry the original request using the same client instance
//           return refreshClient(originalRequest);
//         }
//       } catch (refreshError) {
//         console.error('Refresh token request failed:', refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );
