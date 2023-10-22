import { ProjectSchema } from "@/types/project-schema";
import { atom } from "recoil";

const ProjectSchema: ProjectSchema = {
  id: "",
  title: "",
};

export const initProjectData: ProjectSchema = ProjectSchema;

export const projectDataState = atom({
  key: "projectDataState",
  default: ProjectSchema,
});

const projectsList: ProjectSchema[] = [];

export const projectsListState = atom({
  key: "projectsListState",
  default: projectsList,
});
