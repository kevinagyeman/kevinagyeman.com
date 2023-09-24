import { ReactElement, useState } from "react";
import { projectService } from "../services/project.service";
import { ProjectData } from "../types/project-schema";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { ListPlus, Plus } from "lucide-react";

const ProjectsAdd = () => {
  return (
    <>
      <div className="container">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="my-5">
              <Plus className="mr-2 h-4 w-4" /> Add project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <Form />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default ProjectsAdd;

const Form = (): ReactElement => {
  const [project, setProject] = useState<ProjectData>({
    title: "",
  });

  const addProject = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await projectService.create(project);
      console.log("fatto");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold">Add project</h1>
      <form onSubmit={addProject}>
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
        <Button type="submit" className="mt-3 w-full">
          Button
        </Button>
      </form>
    </>
  );
};
