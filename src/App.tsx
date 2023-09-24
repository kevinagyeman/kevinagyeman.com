import Navbar from "./components/navbar.component";
import { ThemeProvider } from "./components/ui/theme-provider";
import Index from "./pages";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <Index />
      </ThemeProvider>
    </>
  );
}

export default App;
