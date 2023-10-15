import { projectsListState } from "@/store/projects-store";
import { orderBySchema, whereSchema } from "@/types/query-schema";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { projectService } from "../../services/project.service";
import { ProjectData } from "../../types/project-schema";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import ProjectsInfo from "./projects-info.component";

const ProjectsListUser = () => {
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
      <p className=" text-muted-foreground">{t("contactCard")}</p>
      {projects?.map((project: ProjectData, index: number) => (
        <Card
          key={index}
          className="my-3 flex flex-row items-center justify-between"
        >
          <CardHeader>
            <CardTitle>{project.title}</CardTitle>
            <CardDescription>{project.shortDescription}</CardDescription>
          </CardHeader>
          <div className="pr-0">
            {project.id ? <ProjectsInfo projectId={project.id} /> : null}
          </div>
        </Card>
      ))}
    </>
  );
};

export default ProjectsListUser;
