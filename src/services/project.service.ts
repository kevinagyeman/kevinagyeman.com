import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const projects = collection(db, '/projects');

export const projectService = {
  getAll: () => {
    getDocs(projects);
  },
};
