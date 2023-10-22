import { projectService } from "@/services/project.service";
import { projectDataState, projectsListState } from "@/store/projects-store";
import { ProjectSchema } from "@/types/project-schema";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Button } from "../ui/button";
import ProjectForm from "./project-form.component";
import { getSingleProject } from "@/utils/utils";

type ProjectId = {
  projectId: any;
};

const ProjectsUpdate = ({ projectId }: ProjectId) => {
  const [project, setProject] = useRecoilState<ProjectSchema>(projectDataState);
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(true);
  const setProjects = useSetRecoilState<ProjectSchema[]>(projectsListState);

  const updateProject = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await projectService.update(projectId, project);
      setProjects((prev: ProjectSchema[]) => {
        return prev.map((projectValue: ProjectSchema) => {
          if (project.id === projectValue.id) {
            return {
              ...projectValue,
              ...project,
            };
          }
          return projectValue;
        });
      });
      setIsInputDisabled(true);
    } catch (e) {
      console.log(e);
    }
  };

  const editProjectButton = () => {
    if (isInputDisabled) {
      setIsInputDisabled(false);
    } else {
      getSingleProject(projectId, setProject);
      setIsInputDisabled(true);
    }
  };

  useEffect(() => {
    getSingleProject(projectId, setProject);
  }, []);

  return (
    <>
      <div className="my-8 flex flex-row gap-x-3">
        <Button
          variant="secondary"
          onClick={() => {
            editProjectButton();
          }}
        >
          {isInputDisabled ? "Edit" : "Undo"}
        </Button>
        <Button type="submit" disabled={isInputDisabled} form="form">
          Update
        </Button>
        <Button variant="outline" size={"icon"} className="ml-auto w-[50px]" asChild>
          <a href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </a>
        </Button>
      </div>
      <ProjectForm
        isDisabled={isInputDisabled}
        projectSetter={setProject}
        submitFunction={updateProject}
        project={project}
      />
      <Button type="submit" className="mt-3 w-full" disabled={isInputDisabled} form="form">
        Update
      </Button>
    </>
  );
};

export default ProjectsUpdate;
