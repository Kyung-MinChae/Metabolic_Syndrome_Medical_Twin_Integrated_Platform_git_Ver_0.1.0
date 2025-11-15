import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { LoadingSpinner } from "./components/LoadingSpinner";

const Index = lazy(() => import("./pages/Index"));
const Goals = lazy(() => import("./pages/Goals"));
const Roadmap = lazy(() => import("./pages/Roadmap"));
const Results = lazy(() => import("./pages/Results"));
const Simulator = lazy(() => import("./pages/Simulator"));
const Pipeline = lazy(() => import("./pages/Pipeline"));
const Team = lazy(() => import("./pages/Team"));
const RecommendationsDemo = lazy(() => import("./pages/RecommendationsDemo"));
const Coordinator = lazy(() => import("./pages/Coordinator")); // New import
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/results" element={<Results />} />
              <Route path="/simulator" element={<Simulator />} />
              <Route path="/pipeline" element={<Pipeline />} />
              <Route path="/team" element={<Team />} />
              <Route path="/demo/reco" element={<RecommendationsDemo />} />
              <Route path="/coordinator" element={<Coordinator />} /> {/* New route */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;