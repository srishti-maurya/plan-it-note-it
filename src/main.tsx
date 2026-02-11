import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider, NotesProvider } from "./frontend/context";

makeServer();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <NotesProvider>
          <App />
        </NotesProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
