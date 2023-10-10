import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { projectService } from "@/services/project.service";
import { ProjectData } from "@/types/project-schema";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";

type ProjectId = {
  projectId: string;
};

const ProjectsInfo = ({ projectId }: ProjectId) => {
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
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" onClick={() => getSingleProject()}>
          <ChevronLeft className="h-7 w-7 " />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex h-screen w-full flex-col">
        <p className="text-sm text-muted-foreground">{project.title}</p>
        <div className="mt-5 max-h-max  flex-grow space-y-5 overflow-y-auto">
          <div className="text-lg font-semibold">{project.title}</div>
          <p className="text-sm text-muted-foreground">
            {project.shortDescription}
          </p>
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