import { AuthContext } from "@/context/auth-context";
import { Info, Maximize2, Trash } from "lucide-react";
import { ReactElement, useContext, useEffect, useState } from "react";
import { projectService } from "../services/project.service";
import { ProjectData } from "../types/project-schema";
import ProjectsAdd from "./projects-add.component";
import ProjectsUpdate from "./projects-update.component";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
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
  const [projects, setProjects] = useState<ProjectData[]>([]);

  const getProjects = async () => {
    try {
      await projectService.getAll();
      // setProjects(result);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);
  return (
    <>
      {user ? (
        <AdminProjectsList projects={projects} projectSetter={setProjects} />
      ) : (
        <UserProjectsList projects={projects} projectSetter={setProjects} />
      )}
    </>
  );
};

export default ProjectsList;

type ProjectsProps = {
  projects: ProjectData[];
  projectSetter: React.Dispatch<React.SetStateAction<ProjectData[]>>;
};

const AdminProjectsList = ({
  projects,
  projectSetter,
}: ProjectsProps): ReactElement => {
  return (
    <>
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
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Id</TableHead>
                  <TableHead className="p-0">Title</TableHead>
                  <TableHead>Short description</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project: ProjectData, index: number) => (
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
                      <Button variant="ghost" size="icon">
                        <Info className="h-4 w-4" />
                      </Button>
                      <ProjectsUpdate projectId={project.id} />
                      <DeleteModal
                        projectId={project.id}
                        projectSetter={projectSetter}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

const UserProjectsList = ({ projects }: ProjectsProps): ReactElement => {
  return (
    <>
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
              <Button variant="secondary" size="icon" className="rounded-full">
                <Maximize2 className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

type DeleteModalProps = {
  projectId: string | undefined;
  projectSetter: React.Dispatch<React.SetStateAction<ProjectData[]>>;
};

const DeleteModal = ({ projectId }: DeleteModalProps): ReactElement => {
  // const getProjects = async () => {
  //   try {
  //     const result = await projectService.getAll();
  //     projectSetter(result);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Trash className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                projectService.delete(projectId);
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
