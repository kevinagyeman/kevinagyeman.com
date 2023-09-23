import { Timestamp, addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { ProjectData } from '../types/project-schema';

const projects = collection(db, '/projects');

export const projectService = {
  getAll: async () => {
    const data = await getDocs(projects);
    const result: ProjectData[] = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      title: doc.data().title,
    }));
    return result;
  },

  create: async (project: ProjectData) => {
    return await addDoc(projects, {
      ...project,
      createdAt: new Date().toISOString(),
    });
  },
};
