import { Check, Filter, LogOut, User } from "lucide-react";
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
import { orderBySchema, whereSchema } from "@/types/query-schema";

const ProjectsListAdmin = () => {
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

  const getProjects = async () => {
    const data = await projectService.getAll(orderBy);
    setProjects(data);
  };

  const getDraftPublishedProjects = async () => {
    const data = await projectService.getAll(where);
    setProjects(data);
  };

  useEffect(() => {
    getProjects();
    console.log("aggiornamento");
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
                <DropdownMenuItem onClick={() => getDraftPublishedProjects()}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Solo le bozze</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => getDraftPublishedProjects()}>
                  <Check className="mr-2 h-4 w-4" />
                  <span>Solo i pubblicati</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => getProjects()}>
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead className="p-0">Title</TableHead>
              <TableHead>Short description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects?.map((project: ProjectData, index: number) => (
              <TableRow key={index}>
                <TableCell className="py-1 font-medium">{project.id}</TableCell>
                <TableCell className="py-1">{project.title}</TableCell>
                <TableCell className="py-1">
                  {project.shortDescription}
                </TableCell>
                <TableCell className="py-1">
                  {project.isPublished ? (
                    <Badge variant="secondary">Pubblicato</Badge>
                  ) : (
                    <Badge variant="outline">Bozza</Badge>
                  )}
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
