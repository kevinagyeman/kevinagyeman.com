import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { ProjectData } from "../types/project-schema";

const projectsCollection = collection(db, "/projects");

export const projectService = {
  getAll: async () => {
    try {
      const data = await getDocs(projectsCollection);
      const result: ProjectData[] = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        title: doc.data().title,
      }));
      return result;
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

  update: async (projectId: string | undefined, project: ProjectData) => {
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

  getById: async (projectId: string | undefined) => {
    try {
      const data = await getDoc(doc(projectsCollection, projectId));
      if (data.exists()) {
        return data.data();
      }
    } catch (error) {
      console.error(error);
    }
  },

  getById2: (projectId: string | undefined) => {
    const data = getDoc(doc(projectsCollection, projectId));
    data
      .then((res) => {
        console.log(res.data());
        return res.data();
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
