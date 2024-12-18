import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import Dashboard from "./pages/dashboard/index.tsx";
import Calendars from "./pages/calendars/index.tsx";
import TodoPage from "./pages/todos/index.tsx";
import CalendarNewPage from "./pages/calendars/new.tsx";
import DetailPage from "./pages/calendars/detail.tsx";
import Login from "./pages/login/index.tsx";
import NotFound from "./pages/notFound/index.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import { persistor, store } from "./store/store.ts";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "todos",
        element: (
          <ProtectedRoute>
            <TodoPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "calendars",
        children: [
          {
            path: "/calendars",
            element: (
              <ProtectedRoute>
                <Calendars />
              </ProtectedRoute>
            ),
          },
          { path: "/calendars/new", element: <CalendarNewPage /> },
          { path: "/calendars/:id", element: <DetailPage /> },
        ],
      },
    ],
  },
  { path: "/login", element: <Login /> },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
