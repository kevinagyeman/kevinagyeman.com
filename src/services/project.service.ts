import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import { ProjectData } from "../types/project-schema";

const projectsCollection = collection(db, "/projects");

export const projectService = {
  getAll: async () => {
    const data = await getDocs(projectsCollection);
    const result: ProjectData[] = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      title: doc.data().title,
    }));
    return result;
  },

  create: async (project: ProjectData) => {
    await addDoc(projectsCollection, {
      ...project,
      createdAt: new Date().toISOString(),
    });
  },

  delete: async (id: string | undefined) => {
    const data = doc(projectsCollection, id);
    await deleteDoc(data);
  },
};
