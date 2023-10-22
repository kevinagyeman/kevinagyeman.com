import { Button } from "@/components/ui/button";
import { projectDataState } from "@/store/projects-store";
import { ProjectSchema } from "@/types/project-schema";
import { getSingleProject, splitSkills } from "@/utils/utils";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Badge } from "../ui/badge";

type ProjectInfoProps = {
  projectId: any;
};

export default function ProjectsInfo({ projectId }: ProjectInfoProps) {
  const [project, setProject] = useRecoilState<ProjectSchema>(projectDataState);

  useEffect(() => {
    getSingleProject(projectId, setProject);
  }, []);

  return (
    <>
      {project.title === "" ? (
        "dd"
      ) : (
        <>
          <div className="flex flex-col space-y-8">
            <h2 className="text-3xl font-semibold">{project.title}</h2>
            {project.shortDescription && <p className="text-xl text-muted-foreground">{project.shortDescription}</p>}
            {project.imageLink && <img src={project.imageLink} className="w-full rounded-xl" />}
            {project.description && <p className="text-xl">{project.description}</p>}
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
                <Button variant={"secondary"} className="w-full" size={"lg"} asChild>
                  <a href={project.link} target="_blank">
                    Scopri di più
                  </a>
                </Button>
              )}
              <Button variant={"outline"} size={"lg"} asChild>
                <a href="/">
                  <ArrowLeft className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
