import { orderBySchema, whereSchema } from "@/types/query-schema";
import {
  DocumentData,
  QuerySnapshot,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { projectSchema } from "../types/project-schema";

const projectsCollection = collection(db, "/projects");

const mappedProjects = (data: QuerySnapshot<DocumentData, DocumentData>) => {
  const result: projectSchema[] = data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
    title: doc.data().title,
  }));
  return result;
};

export const projectService = {
  getAll: async (orderByValue: orderBySchema, whereValue?: whereSchema) => {
    try {
      const orderByQuery = orderBy(
        orderByValue.fieldPath,
        orderByValue.directionStr,
      );
      if (whereValue) {
        const whereQuery = where(
          whereValue.fieldPath,
          whereValue.opStr,
          whereValue.value,
        );
        const data = await getDocs(
          query(projectsCollection, whereQuery, orderByQuery),
        );
        return mappedProjects(data);
      } else {
        const data = await getDocs(query(projectsCollection, orderByQuery));
        return mappedProjects(data);
      }
    } catch (error) {
      console.error(error);
    }
  },

  create: async (project: projectSchema) => {
    try {
      await addDoc(projectsCollection, {
        ...project,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error(error);
    }
  },

  delete: async (id: string | undefined) => {
    try {
      const data = doc(projectsCollection, id);
      await deleteDoc(data);
    } catch (error) {
      console.error(error);
    }
  },

  update: async (
    projectId: string | undefined,
    project: projectSchema | undefined,
  ) => {
    try {
      const data = doc(projectsCollection, projectId);
      await updateDoc(data, {
        ...project,
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error(error);
    }
  },

  getById: async (projectId: string) => {
    try {
      const data = await getDoc(doc(projectsCollection, projectId));
      if (data.exists()) {
        return data.data();
      }
    } catch (error) {
      console.error(error);
    }
  },
};
