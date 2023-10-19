import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { projectService } from "@/services/project.service";
import { projectSchema } from "@/types/project-schema";
import { splitSkills } from "@/utils/utils";
import { Maximize2 } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Badge } from "../ui/badge";

type ProjectInfoProps = {
  projectId: string;
};

export default function ProjectsInfo({ projectId }: ProjectInfoProps) {
  const [project, setProject] = useState<projectSchema>({
    title: "",
  });

  const { t } = useTranslation();

  const getSingleProject = async () => {
    const data = await projectService.getById(projectId);
    if (data) {
      const currentProject: projectSchema = { ...data, title: data.title };
      setProject(currentProject);
    }
  };

  return (
    <Sheet>
      <SheetTrigger onClick={() => getSingleProject()} asChild>
        <Button variant={"ghost"} className="ml-auto rounded-full" size="icon">
          <Maximize2 className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col">
        <p className="text-sm text-muted-foreground">{project.title}</p>
        <div className="mt-5 flex flex-1 flex-col space-y-5 overflow-y-auto">
          <div className="text-lg font-semibold">{project.title}</div>
          <p className="text-sm text-muted-foreground">
            {project.shortDescription}
          </p>
          <img src={project.imageLink} className="w-full" />
          <p className="text-sm">{project.description}</p>
          <div className="mt-2">
            {splitSkills(`${project?.skills}`, 5).map((skill, index) => (
              <Badge variant="secondary" className="mr-2 mt-2" key={index}>
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex space-x-2">
          {project.link && (
            <Button variant={"secondary"} className="w-3/4">
              <a href={project.link} target="_blank">
                Scopri di più
              </a>
            </Button>
          )}
          <SheetClose asChild>
            <Button variant={"outline"} className="w-1/4">
              Chiudi
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
