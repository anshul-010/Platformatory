// File: frontend/src/main.tsx or index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
<GoogleOAuthProvider clientId="587963875107-0qqpqv81o4k1cgrslsd5ua8j21e2ee33.apps.googleusercontent.com">
  <App />
</GoogleOAuthProvider>
);
