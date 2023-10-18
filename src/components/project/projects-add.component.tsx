import { projectsListState } from "@/store/projects-store";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { projectService } from "../../services/project.service";
import { ProjectData } from "../../types/project-schema";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import ProjectForm from "./project-form.component";

export default function ProjectsAdd() {
  const [project, setProject] = useState<ProjectData>({
    title: "",
  });
  const setProjects = useSetRecoilState<ProjectData[]>(projectsListState);
  const [open, setOpen] = useState<boolean>(false);

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
      setOpen(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => {
              setOpen(true);
            }}
          >
            Aggiungi progetto
          </Button>
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
              Crea Progetto
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
