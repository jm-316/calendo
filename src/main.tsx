import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import Dashboard from "./pages/dashboard/index.tsx";
import Calendars from "./pages/calendars/index.tsx";
import TodoPage from "./pages/todos/index.tsx";
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
        element: <TodoPage />,
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

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
