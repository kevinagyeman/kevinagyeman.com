import { Timestamp } from "firebase/firestore";

export type ProjectSchema = {
  id: string;
  title?: string;
  shortDescription?: string;
  description?: string;
  imageLink?: string;
  link?: string;
  skills?: string;
  isPublished?: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};
