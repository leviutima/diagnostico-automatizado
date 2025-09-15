import { createBrowserRouter } from "react-router-dom";
import { FirstForm } from "./pages/app/first-form/first-form";
import { AppLayout } from "./layout/app-layout";
import { SecondForm } from "./pages/app/second-form/second-form";
import { Diagnostico } from "./pages/private/diagnostico";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <FirstForm /> },
      { path: "/second-form", element: <SecondForm /> },
    ],
  },
  {
    path: "/diagnostico",
    element: <Diagnostico />,
  },
]);
