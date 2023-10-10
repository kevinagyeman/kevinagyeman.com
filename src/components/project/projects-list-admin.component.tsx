import { orderBySchema, whereSchema } from "@/types/query-schema";
import { ArrowDownUp, Check, Filter, LogOut, User } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { projectService } from "../../services/project.service";
import { ProjectData } from "../../types/project-schema";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ProjectsAdd from "./projects-add.component";
import DeleteModal from "./projects-delete.component";
import ProjectsUpdate from "./projects-update.component";
import { useRecoilState } from "recoil";
import { projectsListState } from "@/store/projects-store";

const ProjectsListAdmin = () => {
  const { t } = useTranslation();
  const [projects, setProjects] =
    useRecoilState<ProjectData[]>(projectsListState);
  const [where, setWhere] = useState<whereSchema>({
    fieldPath: "isPublished",
    opStr: "==",
    value: true,
  });
  const [orderBy, setOrderBy] = useState<orderBySchema>({
    fieldPath: "createdAt",
    directionStr: "desc",
  });

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
    getProjects(orderBy);
  }, []);

  return (
    <>
      <div className=" pb-5">
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="mr-2">
                Filtra progetti
                <Filter className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Visualizza</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => setWhere({ ...where, value: false })}
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Solo le bozze</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setWhere({ ...where, value: true })}
                >
                  <Check className="mr-2 h-4 w-4" />
                  <span>Solo i pubblicati</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Annulla i filtri</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <ProjectsAdd />
        </div>
      </div>

      <div className="rounded-md border">
        <Table className="lg:table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="mr-2">
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
              </TableHead>
              <TableHead>Short description</TableHead>
              <TableHead>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="mr-2">
                      Status <ArrowDownUp className="ml-2 h-4 w-4" />
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
                            where,
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
              </TableHead>
              <TableHead>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="mr-2">
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
              </TableHead>
              <TableHead>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="mr-2">
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
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project: ProjectData, index: number) => (
              <TableRow key={index}>
                <TableCell className="py-1">{project.title}</TableCell>
                <TableCell className=" ...  truncate py-1">
                  {project.shortDescription || "-"}
                </TableCell>
                <TableCell className="py-1">
                  {project.isPublished ? (
                    <Badge variant="secondary">Pubblicato</Badge>
                  ) : (
                    <Badge variant="outline">Bozza</Badge>
                  )}
                </TableCell>
                <TableCell className="py-1">
                  {moment(project.updatedAt).format("DD/MM/YYYY H:mm")}
                </TableCell>
                <TableCell className="py-1">
                  {moment(project.createdAt).format("DD/MM/YYYY H:mm")}
                </TableCell>
                <TableCell className="py-1">
                  {project.id && <ProjectsUpdate projectId={project.id} />}
                  {project.id && <DeleteModal projectId={project.id} />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ProjectsListAdmin;
