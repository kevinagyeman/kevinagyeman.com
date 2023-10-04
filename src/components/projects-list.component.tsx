import { AuthContext } from "@/context/auth-context";
import { CreditCard, LogOut, Maximize2, User } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { projectService } from "../services/project.service";
import { ProjectData } from "../types/project-schema";
import ProjectsAdd from "./projects-add.component";
import DeleteModal from "./projects-delete.component";
import ProjectsUpdate from "./projects-update.component";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const ProjectsList = () => {
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
        <div className="container py-10">
          <div className="rounded-md border p-8">
            <div className="pb-5">
              <h3 className="scroll-m-20 text-3xl font-semibold tracking-tight">
                Dashboard
              </h3>
              <p className="text-sm text-muted-foreground">
                manage your projects
              </p>

              <ProjectsAdd />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Filtra</Button>
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
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Solo i pubblicati</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => getProjects()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Vedi tutti</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Id</TableHead>
                    <TableHead className="p-0">Title</TableHead>
                    <TableHead>Short description</TableHead>
                    <TableHead>Description</TableHead>
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
                        {project.description}
                      </TableCell>
                      <TableCell className="py-1">
                        {project.isPublished ? (
                          <Badge variant="secondary">Pubblicato</Badge>
                        ) : (
                          <Badge variant="outline">Bozza</Badge>
                        )}
                      </TableCell>
                      <TableCell className="py-1">
                        <ProjectsUpdate projectId={project.id} />
                        <DeleteModal projectId={project.id} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mt-5 grid gap-5 lg:max-w-[50%] lg:grid-cols-2">
          <div>
            <h2 className="mb-2 scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Projects
            </h2>
            <p className=" text-muted-foreground">
              A modal dialog that interrupts the user with important content and
              expects a response.
            </p>
          </div>

          {projects?.map((project: ProjectData, index: number) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{project.title} </CardTitle>
                <CardDescription>{project.shortDescription}</CardDescription>
              </CardHeader>
              <CardFooter className="float-right">
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default ProjectsList;
