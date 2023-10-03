import { Expand, Info, Maximize, Maximize2, Plus, Trash } from "lucide-react";
import { ReactElement, useContext, useEffect, useState } from "react";
import { projectService } from "../services/project.service";
import { ProjectData } from "../types/project-schema";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { AuthContext } from "@/context/auth-context";

const ProjectsList = () => {
  const user = useContext(AuthContext);
  const [projects, setProjects] = useState<ProjectData[]>([]);

  const getProjects = async () => {
    try {
      const result = await projectService.getAll();
      setProjects(result);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProjects();
    console.log("progetti", projects);
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
      <div className="container">
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Id</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Short description</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project: ProjectData, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{project.id}</TableCell>
                  <TableCell>{project.title}</TableCell>
                  <TableCell>{project.shortDescription}</TableCell>
                  <TableCell>{project.description}</TableCell>
                  <TableCell>
                    <Button variant="secondary" size="icon" className="mr-2">
                      <Info className="h-4 w-4" />
                    </Button>
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

const DeleteModal = ({
  projectId,
  projectSetter,
}: DeleteModalProps): ReactElement => {
  const getProjects = async () => {
    try {
      const result = await projectService.getAll();
      projectSetter(result);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="secondary" size="icon">
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
                getProjects();
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
