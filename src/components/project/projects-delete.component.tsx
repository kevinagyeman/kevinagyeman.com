import { projectsListState } from "@/store/projects-store";
import { projectSchema } from "@/types/project-schema";
import { Trash } from "lucide-react";
import { ReactElement } from "react";
import { useSetRecoilState } from "recoil";
import { projectService } from "../../services/project.service";
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
} from "./../ui/alert-dialog";
import { Button } from "./../ui/button";

type ProjectId = {
  projectId: string;
};

const DeleteModal = ({ projectId }: ProjectId): ReactElement => {
  const setProjects = useSetRecoilState<projectSchema[]>(projectsListState);

  const deleteProject = async () => {
    try {
      await projectService.delete(projectId);
      setProjects((prev: projectSchema[]) => {
        return prev.filter(
          (project: projectSchema) => project.id !== projectId,
        );
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" size="icon" className="w-[50px]">
            <Trash className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              project and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteProject}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteModal;
