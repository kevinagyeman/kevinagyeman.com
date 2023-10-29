import { Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Footer from "./components/footer.component";
import Navbar from "./components/navbar.component";
import { ThemeProvider } from "./components/ui/theme-provider";
import Index from "./pages";
import Dashboard from "./pages/dashboard";
import Information from "./pages/information";
import InformationEdit from "./pages/information-edit";
import Login from "./pages/login";
import Project from "./pages/project";
import ProjectAdd from "./pages/project-add";
import ProjectEdit from "./pages/project-edit";
import { isAdminLoggedDataState } from "./store/admin-store";
import Contacts from "./pages/contacts";

const App = () => {
  const isAdminLogged = useRecoilValue<boolean>(isAdminLoggedDataState);

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <div className="container max-w-lg">
          <Routes>
            <Route index element={<Index />} />
            {isAdminLogged && <Route path="/dashboard" element={<Dashboard />} />}
            {isAdminLogged && <Route path="/dashboard/project-add" element={<ProjectAdd />} />}
            {isAdminLogged && <Route path="/dashboard/project-edit/:id" element={<ProjectEdit />} />}
            {isAdminLogged && <Route path="/dashboard/information-edit" element={<InformationEdit />} />}
            {!isAdminLogged && <Route path="/login" element={<Login />} />}
            <Route path="/project/:id" element={<Project />} />
            <Route path="/information" element={<Information />} />
            <Route path="/information" element={<Index />} />
            <Route path="/contact" element={<Contacts />} />
            <Route path="*" element={<Index />} />
          </Routes>
        </div>
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default App;
