import { createBrowserRouter } from "react-router-dom";
import { FirstForm } from "./pages/app/first-form/first-form";

export const routes = createBrowserRouter([
  { path: "/", element: <FirstForm /> },
]);
