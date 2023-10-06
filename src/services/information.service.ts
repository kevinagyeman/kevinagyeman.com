import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { InformationData } from "../types/information-schema";

const informationCollection = collection(db, "/information");
const informationDocumentId = "CfbOBq4jIbn0qTeL3hfH";

export const informationService = {
  update: async (information: InformationData) => {
    try {
      const data = doc(informationCollection, informationDocumentId);
      await updateDoc(data, {
        ...information,
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error(error);
    }
  },

  getById: async () => {
    try {
      const data = await getDoc(
        doc(informationCollection, informationDocumentId),
      );
      if (data.exists()) {
        return data.data();
      }
    } catch (error) {
      console.error(error);
    }
  },
};
