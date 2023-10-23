import { projectDataState, projectsListState } from "@/store/projects-store";
import { useRecoilState, useSetRecoilState } from "recoil";
import { projectService } from "../../services/project.service";
import { ProjectSchema } from "../../types/project-schema";
import { Button } from "../ui/button";
import ProjectForm from "./project-form.component";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function ProjectsAdd() {
  const [project, setProject] = useRecoilState<ProjectSchema>(projectDataState);
  const setProjects = useSetRecoilState<ProjectSchema[]>(projectsListState);
  const navigate = useNavigate();

  const addProject = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await projectService.create(project);
      const data = await projectService.getAll({
        fieldPath: "createdAt",
        directionStr: "desc",
      });
      if (data) {
        setProjects(data);
        navigate("/dashboard");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="my-8 flex flex-row gap-x-3">
        <Button type="submit" form="form">
          Create
        </Button>
        <Button variant="outline" size={"icon"} className="ml-auto w-[50px]" asChild>
          <a href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </a>
        </Button>
      </div>
      <ProjectForm isDisabled={false} projectSetter={setProject} submitFunction={addProject} project={project} />
      <Button type="submit" className="mt-3 w-full" form="form">
        Create
      </Button>
    </>
  );
}
