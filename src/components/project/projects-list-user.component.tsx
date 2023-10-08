import { orderBySchema, whereSchema } from "@/types/query-schema";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { projectService } from "../../services/project.service";
import { ProjectData } from "../../types/project-schema";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import ProjectsInfo from "./projects-info.component";

const ProjectsListUser = () => {
  const { t } = useTranslation();
  const [projects, setProjects] = useState<ProjectData[] | undefined>([]);
  const [where, setWhere] = useState<whereSchema>({
    fieldPath: "isPublished",
    opStr: "==",
    value: true,
  });
  const [orderBy, setOrderBy] = useState<orderBySchema>({
    fieldPath: "createdAt",
    directionStr: "desc",
  });

  const getDraftPublishedProjects = async () => {
    try {
      const data = await projectService.getAll(orderBy, where);
      setProjects(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getDraftPublishedProjects();
  }, []);
  return (
    <div className="container  lg:max-w-[50%]">
      <h2 className="mb-2 scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {t("projectSection.title")}
      </h2>
      <p className=" text-muted-foreground">{t("projectSection.sentence")}</p>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        {projects?.map((project: ProjectData, index: number) => (
          <Card
            key={index}
            className="flex flex-row items-center justify-between"
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
      </div>
    </div>
  );
};

export default ProjectsListUser;
