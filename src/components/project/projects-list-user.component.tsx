import { projectsListState } from "@/store/projects-store";
import { orderBySchema, whereSchema } from "@/types/query-schema";
import { Check, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { projectService } from "../../services/project.service";
import { ProjectData } from "../../types/project-schema";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import ProjectsInfo from "./projects-info.component";

export default function ProjectsListUser() {
  const { t } = useTranslation();
  const [projects, setProjects] =
    useRecoilState<ProjectData[]>(projectsListState);

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
      {projects?.map((project: ProjectData, index: number) => (
        <div className="cursor-pointer" key={index}>
          {project.id && (
            <ProjectsInfo projectId={project.id}>
              <Card
                className="my-3 flex flex-row items-center justify-between  lg:transition 
              lg:ease-in-out lg:hover:scale-110 lg:hover:bg-zinc-100 lg:dark:hover:bg-zinc-900"
              >
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.shortDescription}</CardDescription>
                  <div className="flex flex-wrap gap-3">
                    {project.skills
                      ?.split(",")
                      ?.slice(0, 4)
                      .map((skill: string, index: number) => (
                        <small key={index} className="flex items-center gap-1">
                          <Check className="h-3 w-3" />
                          {skill}
                        </small>
                      ))}
                  </div>
                </CardHeader>
                <div className="pr-0">
                  <ChevronRight style={{ color: "grey" }} />
                </div>
              </Card>
            </ProjectsInfo>
          )}
        </div>
      ))}
    </>
  );
}
