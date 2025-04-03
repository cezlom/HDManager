
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EquipmentProvider } from "@/context/EquipmentContext";
import Index from "./pages/Index";
import AddEquipment from "./pages/AddEquipment";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <EquipmentProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/add" element={<AddEquipment />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </EquipmentProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
