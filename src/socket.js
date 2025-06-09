import { io } from 'socket.io-client';
const token=localStorage.getItem("token")? JSON.parse(localStorage.getItem("token")) : null;

// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === 'production' ? undefined : 'https://ed-tech-backend-4kuf.onrender.com';
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000';

export const Socket = io(URL, {
  autoConnect: false,
  auth: {
    token: token
  },
  withCredentials: true,
}); 