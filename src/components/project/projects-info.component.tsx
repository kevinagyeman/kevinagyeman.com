import { Button } from "@/components/ui/button";
import { projectDataState } from "@/store/projects-store";
import { ProjectSchema } from "@/types/project-schema";
import { getSingleProject, splitByLanguage, splitSkills } from "@/utils/utils";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ReactElement, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import SkeletonLoader from "../skeleton.component";
import { Badge } from "../ui/badge";
import ProjectNotFound from "./project-not-found.component";
import { Link } from "react-router-dom";

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
                  <Link to={project.link} target="_blank">
                    {t("hero.readMoreButton")} <ArrowUpRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              )}
              <Button variant={"outline"} size={"lg"} asChild>
                <Link to="/">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
