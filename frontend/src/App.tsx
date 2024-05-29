import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { router } from "@/routes/root";
import { Toaster } from "@/components/ui/toaster";
import { queryClient } from "./lib/utils";

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
      <Toaster />
    </>
  );
}

export default App;
