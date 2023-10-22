import { projectsListState } from "@/store/projects-store";
import { OrderBySchema } from "@/types/query-schema";
import { getProjects, splitSkills } from "@/utils/utils";
import { ArrowDownUp, Check, FilterX, Search } from "lucide-react";
import moment from "moment";
import { useEffect } from "react";
import { SetterOrUpdater, useRecoilState } from "recoil";
import { ProjectSchema } from "../../types/project-schema";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Divider from "../ui/divider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import DeleteModal from "./projects-delete.component";

const ProjectsListAdmin = () => {
  const [projects, setProjects] = useRecoilState<ProjectSchema[]>(projectsListState);

  useEffect(() => {
    getProjects(setProjects, {
      fieldPath: "createdAt",
      directionStr: "desc",
    });
  }, []);

  return (
    <>
      <Button variant="secondary" className="w-full" size={"lg"} asChild>
        <a href={`/dashboard/project-add`}>Add New Project</a>
      </Button>
      <Divider title={"Filters"} />
      <div className="flex flex-wrap justify-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Status <Search className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() =>
                  getProjects(
                    setProjects,
                    {
                      fieldPath: "createdAt",
                      directionStr: "desc",
                    },
                    {
                      fieldPath: "isPublished",
                      opStr: "==",
                      value: true,
                    },
                  )
                }
              >
                <span>Solo i pubblicati </span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  getProjects(
                    setProjects,
                    {
                      fieldPath: "createdAt",
                      directionStr: "desc",
                    },
                    {
                      fieldPath: "isPublished",
                      opStr: "==",
                      value: false,
                    },
                  )
                }
              >
                <span>Solo le bozze</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <FilterButton
          buttonLabel={"Title"}
          orderBy={{ fieldPath: "title" }}
          projectsSetter={setProjects}
          descLabel="Dalla Z alla A"
          ascLabel="Dalla A alla Z"
        />
        <FilterButton buttonLabel={"Updated At"} orderBy={{ fieldPath: "updatedAt" }} projectsSetter={setProjects} />
        <FilterButton buttonLabel={"Created At"} orderBy={{ fieldPath: "createdAt" }} projectsSetter={setProjects} />
        <Button
          variant="outline"
          onClick={() =>
            getProjects(setProjects, {
              fieldPath: "createdAt",
              directionStr: "desc",
            })
          }
        >
          Reset filtri <FilterX className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <Divider title={"Projects"} />

      {projects.map((project: ProjectSchema, index: number) => (
        <div className="mb-4 flex flex-col space-y-2 rounded-lg border p-6" key={index}>
          <div>
            {project.isPublished ? (
              <Badge variant="secondary">Published</Badge>
            ) : (
              <Badge variant="outline">Draft</Badge>
            )}
          </div>
          <p className="text-l font-semibold">{project.title}</p>
          <p className="text-sm text-muted-foreground">{project.shortDescription || "-"}</p>
          <div className="flex flex-wrap gap-x-3 gap-y-0">
            {splitSkills(`${project.skills}`, 3).map((skill: string, index: number) => (
              <small key={index} className="flex items-center gap-1">
                <Check className="h-3 w-3" />
                {skill}
              </small>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Updated At: {moment(project.updatedAt).format("DD/MM/YYYY H:mm")}
            <br />
            Created At: {moment(project.createdAt).format("DD/MM/YYYY H:mm")}
          </p>
          <div className="flex gap-x-3 pt-3">
            <Button variant={"secondary"} className="w-full" asChild>
              <a href={`/dashboard/project-edit/${project.id}`}>View Project</a>
            </Button>
            <DeleteModal projectId={project.id} />
          </div>
        </div>
      ))}
    </>
  );
};

export default ProjectsListAdmin;

type FilterButton = {
  buttonLabel: string;
  orderBy: OrderBySchema;
  ascLabel?: string;
  descLabel?: string;
  projectsSetter: SetterOrUpdater<ProjectSchema[]>;
};

const FilterButton = ({ buttonLabel, orderBy, descLabel, ascLabel, projectsSetter }: FilterButton) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            {buttonLabel} <ArrowDownUp className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() =>
                getProjects(projectsSetter, {
                  fieldPath: orderBy.fieldPath,
                  directionStr: "asc",
                })
              }
            >
              <span>{ascLabel ? ascLabel : "Dal meno recente"}</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                getProjects(projectsSetter, {
                  fieldPath: orderBy.fieldPath,
                  directionStr: "desc",
                })
              }
            >
              <span>{descLabel ? descLabel : "Dal più recente"}</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
