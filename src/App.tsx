import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import Footer from "./components/footer.component";
import Navbar from "./components/navbar.component";
import { ThemeProvider } from "./components/ui/theme-provider";
import { AuthContext } from "./context/auth-context";
import Index from "./pages";
import Dashboard from "./pages/dashboard";
import Information from "./pages/information";
import InformationEdit from "./pages/information-edit";
import Login from "./pages/login";
import Project from "./pages/project";
import ProjectAdd from "./pages/project-add";
import ProjectEdit from "./pages/project-edit";
import { informationDataState } from "./store/information-store";
import { projectsListState } from "./store/projects-store";
import { InformationData } from "./types/information-schema";
import { ProjectSchema } from "./types/project-schema";
import { getInformation, getProjects } from "./utils/utils";

const App = () => {
  const admin = useContext(AuthContext);

  const setInformation = useSetRecoilState<InformationData>(informationDataState);
  const setProjects = useSetRecoilState<ProjectSchema[]>(projectsListState);

  useEffect(() => {
    getInformation(setInformation);
    getProjects(
      setProjects,
      {
        fieldPath: "createdAt",
        directionStr: "desc",
      },
      {
        fieldPath: "isPublished",
        opStr: "==",
        value: true,
      },
    );
  }, []);

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar admin={admin} />

        <div className="container max-w-[500px]">
          <Routes>
            <Route index element={<Index />} />
            {admin && <Route path="/dashboard" element={<Dashboard />} />}
            {admin && <Route path="/dashboard/project-add" element={<ProjectAdd />} />}
            {admin && <Route path="/dashboard/project-edit/:id" element={<ProjectEdit />} />}
            {admin && <Route path="/dashboard/information-edit" element={<InformationEdit />} />}
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
