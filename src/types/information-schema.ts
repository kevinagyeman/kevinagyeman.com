import { Timestamp } from "firebase/firestore";

export type InformationSchema = {
  id: string;
  name?: string;
  surname?: string;
  role?: string;
  summary?: string;
  profileImageLink?: string;
  skills?: string;
  email?: string;
  additionalLink?: string;
  additionalInfo?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};
