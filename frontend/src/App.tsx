import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { PayloadFormProvider } from "./context/usePayloadForm";

function App() {
  return (
    <PayloadFormProvider>
      <RouterProvider router={routes} />
    </PayloadFormProvider>
  );
}

export default App;
