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
  const user = useContext(AuthContext);

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {location.pathname !== "/login" && <Navbar />}
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={user ? <Dashboard /> : <Login />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Index />} />
        </Routes>
        {location.pathname !== "/login" && <Footer />}
      </ThemeProvider>
    </>
  );
};

export default App;
