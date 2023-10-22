import { Button } from "@/components/ui/button";
import { projectDataState } from "@/store/projects-store";
import { ProjectSchema } from "@/types/project-schema";
import { getSingleProject, splitByLanguage, splitSkills } from "@/utils/utils";
import { ArrowLeft, ArrowUpRight, MoveLeft } from "lucide-react";
import { ReactElement, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import SkeletonLoader from "../skeleton.component";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Badge } from "../ui/badge";

type ProjectInfoProps = {
  projectId: string;
};

export default function ProjectsInfo({ projectId }: ProjectInfoProps) {
  const [project, setProject] = useRecoilState<ProjectSchema>(projectDataState);
  const { t } = useTranslation();
  const [projectAlert, setProjectAlert] = useState<ReactElement>(<SkeletonLoader />);

  const projectDelayFetch = () => {
    setTimeout(() => {
      setProjectAlert(<ProjectNotFound />);
    }, 2000);
  };

  useEffect(() => {
    projectDelayFetch();
    getSingleProject(projectId, setProject);
  }, []);

  return (
    <>
      {!project.id ? (
        projectAlert
      ) : (
        <>
          <div className="flex flex-col space-y-8">
            <h2 className="text-3xl font-semibold">{splitByLanguage(`${project.title}`)}</h2>
            <p className="text-xl text-muted-foreground">{splitByLanguage(`${project.shortDescription}`)}</p>
            {project.imageLink && <img src={project.imageLink} className="w-full rounded-xl" />}
            {project.description && <p className="text-xl">{splitByLanguage(`${project.description}`)}</p>}
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
                    {t("hero.readMoreButton")} <ArrowUpRight className="ml-2 h-5 w-5" />
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

const ProjectNotFound = () => {
  return (
    <>
      <Alert>
        <AlertTitle className="text-xl">Progetto non trovato</AlertTitle>
        <AlertDescription className="text-l text-muted-foreground">
          Il link che hai non porta a nessun progetto, torna alla home
        </AlertDescription>
      </Alert>
      <Button size={"lg"} asChild className="mt-5 w-full">
        <a href="/">
          <MoveLeft className="mr-2" /> Torna alla home
        </a>
      </Button>
    </>
  );
};
