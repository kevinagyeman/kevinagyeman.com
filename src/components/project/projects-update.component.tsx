import { projectService } from "@/services/project.service";
import { ProjectData } from "@/types/project-schema";
import { Info } from "lucide-react";
import React, { useState } from "react";
import ProjectForm from "./project-form.component";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

type ProjectId = {
  projectId: string;
};

const ProjectsUpdate = ({ projectId }: ProjectId) => {
  const [project, setProject] = useState<ProjectData>({
    title: "",
  });
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);

  const updateProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await projectService.update(projectId, project);
    setOpen(false);
    setIsInputDisabled(true);
  };

  const getSingleProject = async () => {
    const data = await projectService.getById(projectId);
    if (data) {
      const currentProject: ProjectData = { ...data, title: data.title };
      setProject(currentProject);
      setOpen(true);
    }
  };

  const editProjectButton = () => {
    if (isInputDisabled) {
      setIsInputDisabled(false);
    } else {
      getSingleProject();
      setIsInputDisabled(true);
    }
  };

  return (
    <>
      <Sheet
        open={open}
        onOpenChange={() => {
          setOpen(false), setIsInputDisabled(true);
        }}
      >
        <SheetTrigger asChild>
          <Button variant="ghost" onClick={() => getSingleProject()}>
            <Info className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent className="flex h-screen w-full flex-col">
          <div className="border-b pb-4">
            <Button
              variant="secondary"
              onClick={() => {
                editProjectButton();
              }}
              className="w-40"
            >
              {isInputDisabled ? "Modifica progetto" : "Annulla modifiche"}
            </Button>
          </div>
          <div className="mt-5 max-h-max  flex-grow space-y-5 overflow-y-auto px-1">
            <ProjectForm
              isDisabled={isInputDisabled}
              projectSetter={setProject}
              submitFunction={updateProject}
              project={project}
            />
          </div>
          <div className="flex space-x-2 border-t">
            <Button
              type="submit"
              className="mt-3 w-full"
              disabled={isInputDisabled}
              form="form"
            >
              Update
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ProjectsUpdate;
