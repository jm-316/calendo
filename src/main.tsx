import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import Dashboard from "./pages/dashboard/index.tsx";
import Todos from "./pages/todos/index.tsx";
import Calendars from "./pages/calendars/index.tsx";
import CalendarNewPage from "./pages/calendars/new.tsx";
import Login from "./pages/login/index.tsx";
import NotFound from "./pages/notFound/index.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Dashboard /> },
      {
        path: "todos",
        element: <Todos />,
      },
      {
        path: "calendars",
        children: [
          { path: "/calendars", element: <Calendars /> },
          { path: "/calendars/new", element: <CalendarNewPage /> },
        ],
      },
    ],
  },
  { path: "/login", element: <Login /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
