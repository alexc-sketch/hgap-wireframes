import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Router as WouterRouter, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductPage from "./pages/ProductPage";
import HomePageWf from "./pages/HomePageWf";
import BrandPage from "./pages/BrandPage";
import CategoryPage from "./pages/CategoryPage";
import IndustryArchive from "./pages/IndustryArchive";
import IndustryPage from "./pages/IndustryPage";


// Use hash-based routing when not served from a normal site root (e.g. the
// standalone single-file HTML export opened via file:// or a deep path),
// so kit navigation works without a server rewrite.
const useHashRouting =
  typeof window !== "undefined" &&
  (window.location.protocol === "file:" ||
    window.location.pathname.endsWith(".html"));

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/product-list"} component={ProductList} />
      <Route path={"/product-page"} component={ProductPage} />
      <Route path={"/homepage"} component={HomePageWf} />
      <Route path={"/brand-page"} component={BrandPage} />
      <Route path={"/category-page"} component={CategoryPage} />
      <Route path={"/industry-archive"} component={IndustryArchive} />
      <Route path={"/industry-page"} component={IndustryPage} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  const routed = useHashRouting ? (
    <WouterRouter hook={useHashLocation}>
      <Router />
    </WouterRouter>
  ) : (
    <Router />
  );
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          {routed}
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
