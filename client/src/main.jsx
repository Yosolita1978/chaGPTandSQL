import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Auth0Provider } from '@auth0/auth0-react';
const DOMAIN = import.meta.env.VITE_AUTH0_DOMAIN;
const CLIENTID = import.meta.env.VITE_AUTH0_CLIENT_ID;
const IDENTIFIER = import.meta.env.VITE_AUTH0_IDENTIFIER;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
    domain={DOMAIN}
    clientId={CLIENTID}
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: IDENTIFIER,
      scope: "openid profile email"
    }}
    >
    <App />
    </Auth0Provider>
  </React.StrictMode>,
)