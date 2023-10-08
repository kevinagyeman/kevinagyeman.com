import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer.component";
import Navbar from "./components/navbar.component";
import { ThemeProvider } from "./components/ui/theme-provider";
import { AuthContext } from "./context/auth-context";
import Index from "./pages";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";

const App = () => {
  const admin = useContext(AuthContext);

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {!admin && <Route path="/login" element={<Login />} />}
        </Routes>
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default App;
