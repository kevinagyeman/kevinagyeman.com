import { InformationSchema } from "@/types/information-schema";
import { atom } from "recoil";

const informationData: InformationSchema = {
  id: "",
};

export const initInformationData: InformationSchema = informationData;

export const informationDataState = atom({
  key: "informationDataState",
  default: informationData,
});
