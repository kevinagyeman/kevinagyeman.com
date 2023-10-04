import { useState } from "react";
import { projectService } from "../services/project.service";
import { ProjectData } from "../types/project-schema";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";

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
      <Dialog>
        <DialogTrigger asChild>
          <Button className="my-5" variant="secondary">
            Add project
          </Button>
        </DialogTrigger>
        <DialogContent>
          <h1 className="text-4xl font-bold">Add project</h1>
          <form onSubmit={(e) => addProject(e)}>
            <div className="flex items-center space-x-2">
              <Switch
                id="status-mode"
                onCheckedChange={(e) => {
                  setProject({ ...project, isPublished: e.valueOf() });
                }}
              />
              <Label htmlFor="status-mode">
                {project?.isPublished ? "Pubblicato" : "Bozza"}
              </Label>
            </div>
            <div className="mb-2">
              <Label>Title</Label>
              <Input
                type="text"
                placeholder="title"
                value={project?.title}
                onChange={(e) => {
                  setProject({ ...project, title: e.target.value });
                }}
              />
            </div>
            <div className="mb-2">
              <Label>Short Description</Label>
              <Input
                type="text"
                placeholder="title"
                value={project?.shortDescription}
                onChange={(e) => {
                  setProject({ ...project, shortDescription: e.target.value });
                }}
              />
            </div>
            <div className="mb-2">
              <Label>Description</Label>
              <Textarea
                placeholder="title"
                value={project?.description}
                onChange={(e) => {
                  setProject({ ...project, description: e.target.value });
                }}
              ></Textarea>
            </div>
            <div className="mb-2">
              <Label>Link</Label>
              <Input
                type="text"
                placeholder="title"
                value={project?.link}
                onChange={(e) => {
                  setProject({ ...project, link: e.target.value });
                }}
              />
            </div>
            <div className="mb-2">
              <Label>Image Link</Label>
              <Input
                type="text"
                placeholder="title"
                value={project?.imageLink}
                onChange={(e) => {
                  setProject({ ...project, imageLink: e.target.value });
                }}
              />
            </div>
            <Button type="submit" className="mt-3 w-full">
              Add
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectsAdd;
