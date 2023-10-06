import { useState } from "react";
import { projectService } from "../../services/project.service";
import { ProjectData } from "../../types/project-schema";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import ProjectForm from "./project-form.component";

const ProjectsAdd = () => {
  const [project, setProject] = useState<ProjectData>({
    title: "",
  });

  const addProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await projectService.create(project);
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="secondary">Aggiungi progetto</Button>
        </SheetTrigger>
        <SheetContent className="flex h-screen w-full flex-col">
          <div className="mt-5 max-h-max  flex-grow space-y-5 overflow-y-auto px-1">
            <ProjectForm
              isDisabled={false}
              projectSetter={setProject}
              submitFunction={addProject}
              project={project}
            />
          </div>
          <div className="flex space-x-2 border-t">
            <Button type="submit" className="mt-3 w-full" form="form">
              crea
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ProjectsAdd;
