import {
  DocumentData,
  QuerySnapshot,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { ProjectData } from "../types/project-schema";

const projectsCollection = collection(db, "/projects");

const mappedProjects = (data: QuerySnapshot<DocumentData, DocumentData>) => {
  const result: ProjectData[] = data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
    title: doc.data().title,
  }));
  return result;
};

export const projectService = {
  getAll: async () => {
    try {
      const data = await getDocs(projectsCollection);
      return mappedProjects(data);
    } catch (error) {
      console.error(error);
    }
  },

  getAllDraftsPublished: async (published: boolean) => {
    try {
      const data = await getDocs(
        query(projectsCollection, where("isPublished", "==", published)),
      );
      return mappedProjects(data);
    } catch (error) {
      console.error(error);
    }
  },

  create: async (project: ProjectData) => {
    try {
      await addDoc(projectsCollection, {
        ...project,
        createdAt: new Date().toISOString(),
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
    project: ProjectData | undefined,
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
