import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer.component";
import Navbar from "./components/navbar.component";
import { ThemeProvider } from "./components/ui/theme-provider";
import { AuthContext } from "./context/auth-context";
import Index from "./pages";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Project from "./pages/project";
import Information from "./pages/information";
import ProjectAdd from "./pages/project-add";
import ProjectEdit from "./pages/project-edit";
import InformationEdit from "./pages/information-edit";

const App = () => {
  const admin = useContext(AuthContext);

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />

        <div className="container max-w-[500px]">
          <Routes>
            <Route index element={<Index />} />
            {admin && <Route path="/dashboard" element={<Dashboard />} />}
            {admin && (
              <Route path="/dashboard/project-add" element={<ProjectAdd />} />
            )}
            {admin && (
              <Route
                path="/dashboard/project-edit/:id"
                element={<ProjectEdit />}
              />
            )}
            {admin && (
              <Route
                path="/dashboard/information-edit"
                element={<InformationEdit />}
              />
            )}
            {!admin && <Route path="/login" element={<Login />} />}
            <Route path="/project/:id" element={<Project />} />
            <Route path="/information" element={<Information />} />
            <Route path="*" element={"Pagina non trovata"} />
          </Routes>
        </div>
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default App;
