import { projectsListState } from "@/store/projects-store";
import { orderBySchema, whereSchema } from "@/types/query-schema";
import { splitSkills } from "@/utils/utils";
import { Check } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { projectService } from "../../services/project.service";
import { projectSchema } from "../../types/project-schema";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import ProjectsInfo from "./projects-info.component";

export default function ProjectsListUser() {
  const { t } = useTranslation();
  const [projects, setProjects] =
    useRecoilState<projectSchema[]>(projectsListState);

  const getProjects = async (
    orderByValue: orderBySchema,
    whereValue?: whereSchema,
  ) => {
    try {
      const data = await projectService.getAll(orderByValue, whereValue);
      if (data) {
        setProjects(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProjects(
      {
        fieldPath: "createdAt",
        directionStr: "desc",
      },
      {
        fieldPath: "isPublished",
        opStr: "==",
        value: true,
      },
    );
  }, []);
  return (
    <>
      <h2 className="mb-2 scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {t("projectSection.title")}
      </h2>
      <p className="text-muted-foreground">{t("projectSection.sentence")}</p>
      {projects?.map((project: projectSchema, index: number) => (
        <Card
          key={index}
          className="my-3 lg:transition 
              lg:ease-in-out lg:hover:scale-110"
        >
          <CardHeader>
            <CardTitle>{project.title}</CardTitle>
            <CardDescription>{project.shortDescription}</CardDescription>
            <div className="flex flex-wrap gap-3">
              {splitSkills(`${project?.skills}`, 4).map((skill, index) => (
                <small key={index} className="flex items-center gap-1">
                  <Check className="h-3 w-3" />
                  {skill}
                </small>
              ))}
              {project.id && <ProjectsInfo projectId={project.id} />}
            </div>
          </CardHeader>
        </Card>
      ))}
    </>
  );
}
