import { Button } from "@/components/ui/button";
import { projectService } from "@/services/project.service";
import { projectSchema } from "@/types/project-schema";
import { splitSkills } from "@/utils/utils";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";

type ProjectInfoProps = {
  projectId: any;
};

export default function ProjectsInfo({ projectId }: ProjectInfoProps) {
  const [project, setProject] = useState<projectSchema>({
    title: "",
  });

  //const { t } = useTranslation();

  const getSingleProject = async () => {
    const data = await projectService.getById(projectId);
    if (data) {
      const currentProject: projectSchema = { ...data, title: data.title };
      setProject(currentProject);
    }
  };

  useEffect(() => {
    getSingleProject();
  }, []);

  return (
    <>
      {project.title === "" ? (
        "dd"
      ) : (
        <>
          <div className="flex flex-col space-y-8">
            <h2 className="text-3xl font-semibold">{project.title}</h2>
            {project.shortDescription && (
              <p className="text-xl text-muted-foreground">
                {project.shortDescription}
              </p>
            )}
            {project.imageLink && (
              <img src={project.imageLink} className="w-full rounded-xl" />
            )}
            {project.description && (
              <p className="text-xl">{project.description}</p>
            )}
            {project?.skills && (
              <div>
                {splitSkills(`${project?.skills}`).map((skill, index) => (
                  <Badge variant="secondary" className="mr-2 mt-2" key={index}>
                    {skill}
                  </Badge>
                ))}
              </div>
            )}
            <div className="flex space-x-2">
              {project.link && (
                <Button variant={"secondary"} className="w-3/4" asChild>
                  <a href={project.link} target="_blank">
                    Scopri di più
                  </a>
                </Button>
              )}
              <Button variant={"outline"} className="w-1/4" asChild>
                <a href="/">Indietro</a>
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
