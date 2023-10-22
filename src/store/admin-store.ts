import { atom } from "recoil";

export const isAdminLoggedData: any = false;

export const isAdminLoggedDataState = atom({
  key: "isAdminLoggedDataState",
  default: isAdminLoggedData,
});
