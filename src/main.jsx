import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ApolloProvider } from "@apollo/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RegisterUserPage from "./components/RegisterUser.jsx";
import Mentors from "./pages/Mentors.jsx";
import ViewRequests from "./pages/ViewRequests.jsx";
import client from "../ApolloClientSetup.js";
import LoginUser from "./components/LoginUser.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RegisterUserPage />,
  },
  {
    path: "/mentors",
    element: <Mentors />,
  },
  {
    path: "/requests",
    element: <ViewRequests />,
  },
  {
    path: "/login",
    element: <LoginUser />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);
