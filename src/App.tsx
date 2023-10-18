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
        <div className="container max-w-[500px]">
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            {admin && <Route path="/dashboard" element={<Dashboard />} />}
            {!admin && <Route path="/login" element={<Login />} />}
            <Route path="*" element={"Pagina non trovata"} />
          </Routes>
          <Footer />
        </div>
      </ThemeProvider>
    </>
  );
};

export default App;
