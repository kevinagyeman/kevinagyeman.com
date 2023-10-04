import React, { ReactElement, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { ProjectData } from "@/types/project-schema";
import { projectService } from "@/services/project.service";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Pencil } from "lucide-react";

const ProjectsUpdate = ({ projectId }: ProjectId) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost">
            <Pencil className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <Form projectId={projectId} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectsUpdate;

type ProjectId = {
  projectId: string | undefined;
};

const Form = ({ projectId }: ProjectId): ReactElement => {
  const [project, setProject] = useState<ProjectData>({
    title: "",
  });

  const updateProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    projectService.update(projectId, project);
  };

  const getProject = () => {
    projectService.getById(projectId);
    console.log(projectService.getById(projectId));
  };

  return (
    <>
      <button onClick={getProject}>get project</button>
      <h1 className="text-4xl font-bold">update project</h1>
      <form onSubmit={updateProject}>
        <div className="mb-2">
          <Label>Title</Label>
          <Input
            type="text"
            placeholder="title"
            value={project.title}
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
            value={project.shortDescription}
            onChange={(e) => {
              setProject({ ...project, shortDescription: e.target.value });
            }}
          />
        </div>
        <div className="mb-2">
          <Label>Description</Label>
          <Textarea
            placeholder="title"
            value={project.description}
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
            value={project.link}
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
            value={project.imageLink}
            onChange={(e) => {
              setProject({ ...project, imageLink: e.target.value });
            }}
          />
        </div>
        <Button type="submit" className="mt-3 w-full">
          Update
        </Button>
      </form>
    </>
  );
};
