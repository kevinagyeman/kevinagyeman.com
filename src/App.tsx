import Authentication from "./components/authentication.component";
import Navbar from "./components/navbar.component";
import { ThemeProvider } from "./components/ui/theme-provider";
import Index from "./pages/user";

function App() {
  return (
    <>
      <Authentication />
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <Index />
      </ThemeProvider>
    </>
  );
}

export default App;
