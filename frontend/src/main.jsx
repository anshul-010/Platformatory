// File: frontend/src/main.tsx or index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
  domain="dev-toipslult5bvi0ch.us.auth0.com"
  clientId="d9AfFOGkkefi3EMSYqpUMcggnOQhRDFo"
  authorizationParams={{ redirect_uri: "http://localhost:8000/api" }}
>
  <App />
</Auth0Provider>
);
