import { FieldPath, OrderByDirection, WhereFilterOp } from "firebase/firestore";

export type whereSchema = {
  fieldPath: string | FieldPath;
  opStr: WhereFilterOp;
  value: unknown;
};

export type orderBySchema = {
  fieldPath: string | FieldPath;
  directionStr?: OrderByDirection;
};
