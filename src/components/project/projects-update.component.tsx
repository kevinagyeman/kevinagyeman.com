import { projectService } from "@/services/project.service";
import { projectDataState, projectsListState } from "@/store/projects-store";
import { ProjectSchema } from "@/types/project-schema";
import { ArrowLeft } from "lucide-react";
import React, { ReactElement, useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Button } from "../ui/button";
import ProjectForm from "./project-form.component";
import { getSingleProject } from "@/utils/utils";
import { useNavigate } from "react-router-dom";
import ProjectNotFound from "./project-not-found.component";
import SkeletonLoader from "../skeleton.component";

type ProjectId = {
  projectId: any;
};

const ProjectsUpdate = ({ projectId }: ProjectId) => {
  const [project, setProject] = useRecoilState<ProjectSchema>(projectDataState);
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(true);
  const setProjects = useSetRecoilState<ProjectSchema[]>(projectsListState);
  const navigate = useNavigate();
  const [projectAlert, setProjectAlert] = useState<ReactElement>(<SkeletonLoader />);

  const projectDelayFetch = () => {
    setTimeout(() => {
      setProjectAlert(<ProjectNotFound />);
    }, 2000);
  };

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
      navigate("/dashboard");
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
    projectDelayFetch();
    getSingleProject(projectId, setProject);
  }, []);

  return (
    <>
      {!project.id ? (
        projectAlert
      ) : (
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
      )}
    </>
  );
};

export default ProjectsUpdate;
