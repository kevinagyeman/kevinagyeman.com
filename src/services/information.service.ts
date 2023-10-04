import {
  DocumentData,
  DocumentSnapshot,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { InformationData } from "../types/information-schema";

const informationCollection = collection(db, "/information");
const informationDocumentId = "CfbOBq4jIbn0qTeL3hfH";
const docRef = doc(informationCollection, informationDocumentId);

export const informationService = {
  update: async (informationData: InformationData) => {
    await updateDoc(docRef, informationData);
  },

  get: () => {
    getDoc(docRef).then((res) => {
      return res.data();
    });
  },

  getTest: async () => {
    const data = await getDoc(docRef);
    if (data.exists()) {
      return data.data();
    }
  },
};
