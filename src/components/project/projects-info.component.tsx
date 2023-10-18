import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { projectService } from "@/services/project.service";
import { ProjectData } from "@/types/project-schema";
import { Check } from "lucide-react";
import { ReactNode, useState } from "react";

type ProjectInfoProps = {
  projectId: string;
  children: ReactNode;
};

const ProjectsInfo = ({ projectId, children }: ProjectInfoProps) => {
  const [project, setProject] = useState<ProjectData>({
    title: "",
  });

  const getSingleProject = async () => {
    const data = await projectService.getById(projectId);
    if (data) {
      const currentProject: ProjectData = { ...data, title: data.title };
      setProject(currentProject);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild onClick={() => getSingleProject()}>
        {children}
      </SheetTrigger>
      <SheetContent className="flex h-screen w-full flex-col">
        <p className="text-sm text-muted-foreground">{project.title}</p>
        <div className="mt-5 max-h-max  flex-grow space-y-5 overflow-y-auto">
          <div className="text-lg font-semibold">{project.title}</div>
          <p className="text-sm text-muted-foreground">
            {project.shortDescription}
          </p>
          <p className="text-sm text-muted-foreground">{project.description}</p>
          <div className="flex gap-3">
            {project.skills?.split(",")?.map((skill: string, index: number) => (
              <small key={index} className="flex items-center gap-1">
                <Check className="h-3 w-3" />
                {skill}
              </small>
            ))}
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant={"secondary"} className="w-3/4">
            Contatti
          </Button>
          <SheetClose asChild>
            <Button variant={"outline"} className="w-1/4">
              Chiudi
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ProjectsInfo;
