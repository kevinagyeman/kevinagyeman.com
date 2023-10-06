import { AuthContext } from "@/context/auth-context";
import { Check, Filter, LogOut, User } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { projectService } from "../../services/project.service";
import { ProjectData } from "../../types/project-schema";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
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
import ProjectsInfo from "./projects-info.component";
import ProjectsUpdate from "./projects-update.component";

const ProjectsList = () => {
  const { t } = useTranslation();
  const user = useContext(AuthContext);
  const [projects, setProjects] = useState<ProjectData[] | undefined>([]);

  const getProjects = async () => {
    const data = await projectService.getAll();
    setProjects(data);
  };

  const getDraftPublishedProjects = async (published: boolean) => {
    const data = await projectService.getAllDraftsPublished(published);
    setProjects(data);
  };

  useEffect(() => {
    user ? getProjects() : getDraftPublishedProjects(true);
  }, []);
  return (
    <>
      {user ? (
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
                      onClick={() => getDraftPublishedProjects(false)}
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>Solo le bozze</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => getDraftPublishedProjects(true)}
                    >
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
                    <TableCell className="py-1 font-medium">
                      {project.id}
                    </TableCell>
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
      ) : (
        <>
          <div className="container  lg:max-w-[50%]">
            <h2 className="mb-2 scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              {t("projectSection.title")}
            </h2>
            <p className=" text-muted-foreground">
              {t("projectSection.sentence")}
            </p>
            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              {projects?.map((project: ProjectData, index: number) => (
                <Card
                  key={index}
                  className="flex flex-row items-center justify-between"
                >
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>
                      {project.shortDescription}
                    </CardDescription>
                  </CardHeader>
                  <div className="pr-0">
                    {project.id ? (
                      <ProjectsInfo projectId={project.id} />
                    ) : null}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProjectsList;
