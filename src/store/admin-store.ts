import { atom } from "recoil";

export const isAdminLoggedData: boolean = localStorage.getItem("admin") !== null ? true : false;

export const isAdminLoggedDataState = atom({
  key: "isAdminLoggedDataState",
  default: isAdminLoggedData,
});
