import { projectsListState } from "@/store/projects-store";
import { ProjectSchema } from "@/types/project-schema";
import { Trash } from "lucide-react";
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

export default function DeleteModal({ projectId }: ProjectId) {
  const setProjects = useSetRecoilState<ProjectSchema[]>(projectsListState);

  const deleteProject = async () => {
    try {
      await projectService.delete(projectId);
      setProjects((prev: ProjectSchema[]) => {
        return prev.filter((project: ProjectSchema) => project.id !== projectId);
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
              This action cannot be undone. This will permanently delete your project and remove your data from our
              servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteProject}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
