import React from "react";
import ReactDOM from "react-dom";
import App from "./App.tsx";
import "./styles/index.scss";
import ErrorPage from "./error-page.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import JsonMapper from "./components/JsonMapper/JsonMapper.tsx";
import JsonComparer from "./components/JsonComparer/JsonComparer.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "jsonmapper",
        element: <JsonMapper />,
      },
      {
        path: "jsoncomparer",
        element: <JsonComparer />,
      },
    ],
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById("root")
);
