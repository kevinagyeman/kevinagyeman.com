import { projectSchema } from "@/types/project-schema";
import { atom } from "recoil";

const projectSchema: projectSchema = {
  title: "",
};

export const initProjectData: projectSchema = projectSchema;

export const projectDataState = atom({
  key: "projectDataState",
  default: projectSchema,
});

const projectsList: projectSchema[] = [];

export const projectsListState = atom({
  key: "projectsListState",
  default: projectsList,
});
