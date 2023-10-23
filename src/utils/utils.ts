import i18n from "@/i18n";
import { informationService } from "@/services/information.service";
import { projectService } from "@/services/project.service";
import { InformationSchema } from "@/types/information-schema";
import { ProjectSchema } from "@/types/project-schema";
import { OrderBySchema, WhereSchema } from "@/types/query-schema";
import { SetterOrUpdater } from "recoil";

export const splitByLanguage = (string: string): string => {
  const itString = string.split("ENG")[0];
  const enString = string.split("ENG")[1];

  if (i18n.language === "en") {
    return enString;
  } else {
    return itString;
  }
};

export const splitSkills = (string: string, numberOfEelementsDisplayed?: number): string[] => {
  const splittedString = string.split(",");
  if (!numberOfEelementsDisplayed) {
    return splittedString;
  } else {
    return splittedString.slice(0, numberOfEelementsDisplayed);
  }
};

export const getProjects = async (
  projectsSetter: SetterOrUpdater<ProjectSchema[]>,
  orderByValue: OrderBySchema,
  whereValue?: WhereSchema,
) => {
  try {
    const data = await projectService.getAll(orderByValue, whereValue);
    if (data) {
      projectsSetter(data);
    }
  } catch (e) {
    console.log(e);
  }
};

export const getSingleProject = async (projectId: string, projectSetter: SetterOrUpdater<ProjectSchema>) => {
  const data = await projectService.getById(projectId);
  if (data) {
    const currentProject: ProjectSchema = {
      ...data,
      id: data.id,
    };
    projectSetter(currentProject);
  }
};

export const getInformation = async (informationSetter: SetterOrUpdater<InformationSchema>) => {
  try {
    const data = await informationService.getById();
    if (data) {
      const currentInformation: InformationSchema = {
        ...data,
        id: data.id,
      };
      informationSetter(currentInformation);
    }
  } catch (e) {
    console.log(e);
  }
};
