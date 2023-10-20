import { projectsListState } from "@/store/projects-store";
import { orderBySchema, whereSchema } from "@/types/query-schema";
import { splitSkills } from "@/utils/utils";
import { ArrowDownUp, Check, FilterX, Search } from "lucide-react";
import moment from "moment";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { projectService } from "../../services/project.service";
import { projectSchema } from "../../types/project-schema";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Divider from "../ui/divider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import DeleteModal from "./projects-delete.component";

const ProjectsListAdmin = () => {
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
    getProjects({
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
              Title <ArrowDownUp className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Ordine</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() =>
                  getProjects({
                    fieldPath: "title",
                    directionStr: "asc",
                  })
                }
              >
                <span>Dalla A alla Z </span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  getProjects({
                    fieldPath: "title",
                    directionStr: "desc",
                  })
                }
              >
                <span>Dalla Z alla A</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Status <Search className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Trova</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() =>
                  getProjects(
                    {
                      fieldPath: "createdAt",
                      directionStr: "asc",
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Updated At <ArrowDownUp className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Ordine</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() =>
                  getProjects({
                    fieldPath: "updatedAt",
                    directionStr: "asc",
                  })
                }
              >
                <span>Dal meno recente</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  getProjects({
                    fieldPath: "updatedAt",
                    directionStr: "desc",
                  })
                }
              >
                <span>Dal più recente</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Created At <ArrowDownUp className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Ordine</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() =>
                  getProjects({
                    fieldPath: "createdAt",
                    directionStr: "asc",
                  })
                }
              >
                <span>Dal meno recente</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  getProjects({
                    fieldPath: "createdAt",
                    directionStr: "desc",
                  })
                }
              >
                <span>Dal più recente</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          onClick={() =>
            getProjects({
              fieldPath: "createdAt",
              directionStr: "desc",
            })
          }
        >
          Reset filtri <FilterX className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <Divider title={"Projects"} />

      {projects.map((project: projectSchema, index: number) => (
        <div
          className="mb-4 flex flex-col space-y-2 rounded-lg border p-6"
          key={index}
        >
          <div>
            {project.isPublished ? (
              <Badge variant="secondary">Published</Badge>
            ) : (
              <Badge variant="outline">Draft</Badge>
            )}
          </div>
          <p className="text-l font-semibold">{project.title}</p>
          <p className="text-sm text-muted-foreground">
            {project.shortDescription || "-"}
          </p>
          <div className="flex flex-wrap gap-x-3 gap-y-0">
            {splitSkills(`${project.skills}`, 3).map(
              (skill: string, index: number) => (
                <small key={index} className="flex items-center gap-1">
                  <Check className="h-3 w-3" />
                  {skill}
                </small>
              ),
            )}
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
            {project.id && <DeleteModal projectId={project.id} />}
          </div>
        </div>
      ))}
    </>
  );
};

export default ProjectsListAdmin;
