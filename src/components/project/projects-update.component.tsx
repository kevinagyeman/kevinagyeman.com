import { projectService } from "@/services/project.service";
import { initProjectData, projectDataState } from "@/store/projects-store";
import { ProjectSchema } from "@/types/project-schema";
import { getSingleProject } from "@/utils/utils";
import { ArrowLeft } from "lucide-react";
import React, { ReactElement, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import SkeletonLoader from "../skeleton.component";
import { Button } from "../ui/button";
import ProjectForm from "./project-form.component";
import ProjectNotFound from "./project-not-found.component";

type ProjectId = {
  projectId: any;
};

export default function ProjectsUpdate({ projectId }: ProjectId) {
  const [project, setProject] = useRecoilState<ProjectSchema>(projectDataState);
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(true);
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
      setIsInputDisabled(true);
      navigate("/dashboard");
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
    return () => {
      setProject(initProjectData);
    };
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
              <Link to="/dashboard">
                <ArrowLeft className="h-4 w-4" />
              </Link>
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
}
