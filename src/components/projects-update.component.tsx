import { projectService } from "@/services/project.service";
import { ProjectData } from "@/types/project-schema";
import { Info } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";

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

  const draftPublishSwitch = (e: boolean) => {
    setProject({ ...project, isPublished: e.valueOf() });
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
      {" "}
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

          <div className="max-h-max  flex-grow space-y-5 overflow-y-auto">
            <form onSubmit={(e) => updateProject(e)} id="form">
              <div className="mb-4 flex items-center space-x-2">
                <Switch
                  id="status-mode"
                  onCheckedChange={(e) => {
                    draftPublishSwitch(e);
                  }}
                  checked={project?.isPublished}
                  disabled={isInputDisabled}
                />
                <Label htmlFor="status-mode">
                  {project?.isPublished ? "Pubblicato" : "Bozza"}
                </Label>
              </div>

              <div className="mb-2">
                <Label>Title</Label>
                <Input
                  required={true}
                  type="text"
                  placeholder="title"
                  value={project.title || ""}
                  onChange={(e) => {
                    setProject({ ...project, title: e.target.value });
                  }}
                  disabled={isInputDisabled}
                />
              </div>
              <div className="mb-2">
                <Label>Short Description</Label>
                <Textarea
                  placeholder="title"
                  value={project.shortDescription || undefined}
                  onChange={(e) => {
                    setProject({
                      ...project,
                      shortDescription: e.target.value,
                    });
                  }}
                  disabled={isInputDisabled}
                  maxLength={150}
                  rows={4}
                ></Textarea>
              </div>
              <div className="mb-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="title"
                  value={project.description}
                  onChange={(e) => {
                    setProject({ ...project, description: e.target.value });
                  }}
                  disabled={isInputDisabled}
                  rows={14}
                ></Textarea>
              </div>
              <div className="mb-2">
                <Label>Link</Label>
                <Input
                  type="text"
                  placeholder="title"
                  value={project?.link || ""}
                  onChange={(e) => {
                    setProject({ ...project, link: e.target.value });
                  }}
                  disabled={isInputDisabled}
                />
              </div>
              <div className="mb-2">
                <Label>Image Link</Label>
                <Input
                  type="text"
                  placeholder="title"
                  value={project?.imageLink || ""}
                  onChange={(e) => {
                    setProject({ ...project, imageLink: e.target.value });
                  }}
                  disabled={isInputDisabled}
                />
              </div>
            </form>
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
