import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from "@react-oauth/google";
const clintid = import.meta.env.VITE_CLINT_ID

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clintid}>
    <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
