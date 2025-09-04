import { createBrowserRouter } from "react-router-dom";
import { FirstForm } from "./pages/app/first-form/first-form";
import { AppLayout } from "./layout/app-layout";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [{ path: "/", element: <FirstForm /> }],
  },
]);
