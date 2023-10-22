import { projectDataState, projectsListState } from "@/store/projects-store";
import { useRecoilState, useSetRecoilState } from "recoil";
import { projectService } from "../../services/project.service";
import { ProjectSchema } from "../../types/project-schema";
import { Button } from "../ui/button";
import ProjectForm from "./project-form.component";

export default function ProjectsAdd() {
  const [project, setProject] = useRecoilState<ProjectSchema>(projectDataState);
  const setProjects = useSetRecoilState<ProjectSchema[]>(projectsListState);

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
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <ProjectForm isDisabled={false} projectSetter={setProject} submitFunction={addProject} project={project} />
      <Button type="submit" className="mt-3 w-full" form="form">
        Crea Progetto
      </Button>
    </>
  );
}
