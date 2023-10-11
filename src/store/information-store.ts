import { InformationData } from "@/types/information-schema";
import { atom } from "recoil";

const informationData: InformationData = {
  name: "",
};

export const initInformationData: InformationData = informationData;

export const informationDataState = atom({
  key: "informationDataState",
  default: informationData,
});
