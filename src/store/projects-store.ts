import { ProjectSchema } from "@/types/project-schema";
import { atom } from "recoil";

const projectData: ProjectSchema = {
  id: "",
  isPublished: false,
};

export const initProjectData: ProjectSchema = projectData;

export const projectDataState = atom({
  key: "projectDataState",
  default: projectData,
});

const projectsList: ProjectSchema[] = [];

export const projectsListState = atom({
  key: "projectsListState",
  default: projectsList,
});
