import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { PayloadFormProvider } from "./context/usePayloadForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
        refetchOnReconnect: true,
        staleTime: 1000 * 60 * 5,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors closeButton expand={false} className="w-[20vw]" />
      <PayloadFormProvider>
        <RouterProvider router={routes} />
      </PayloadFormProvider>
    </QueryClientProvider>
  );
}

export default App;
