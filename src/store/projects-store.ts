import { ProjectData } from "@/types/project-schema";
import { atom } from "recoil";

const projectData: ProjectData = {
  title: "",
};

export const initProjectData: ProjectData = projectData;

export const projectDataState = atom({
  key: "projectDataState",
  default: projectData,
});

const projectsList: ProjectData[] = [];

export const projectsListState = atom({
  key: "projectsListState",
  default: projectsList,
});
