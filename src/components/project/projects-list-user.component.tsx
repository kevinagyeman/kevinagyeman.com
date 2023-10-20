import { projectsListState } from "@/store/projects-store";
import { orderBySchema, whereSchema } from "@/types/query-schema";
import { splitSkills } from "@/utils/utils";
import { Check } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { projectService } from "../../services/project.service";
import { projectSchema } from "../../types/project-schema";

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
        <a href={`/project/${project.id}`} key={index}>
          <div
            className="my-3 flex 
        flex-col space-y-3 rounded-lg border p-6 lg:transition lg:ease-in-out lg:hover:scale-110 lg:hover:bg-zinc-100 lg:dark:hover:bg-zinc-900"
          >
            <h3 className="text-2xl font-semibold tracking-tight">
              {project.title}
            </h3>
            <p className="text-muted-foreground">{project.shortDescription}</p>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {splitSkills(`${project?.skills}`, 3).map((skill, index) => (
                <p key={index} className="flex items-center gap-1">
                  <Check className="h-4 w-4" />
                  {skill}
                </p>
              ))}
            </div>
          </div>
        </a>
      ))}
    </>
  );
}
