import { informationService } from "@/services/information.service";
import { InformationData } from "@/types/information-schema";
import { useState } from "react";
import InformationUpdate from "./information-update.component";

const InfomationElement = () => {
  const [information, setInformation] = useState<InformationData>();

  const getInformation = async () => {
    const data = await informationService.getById();
    if (data) {
      const currentInformation: InformationData = { ...data, name: data.name };
      setInformation(currentInformation);
    }
  };

  return (
    <>
      <div className=" pb-5">
        <div className="text-right">
          <InformationUpdate />
        </div>
      </div>
    </>
  );
};

export default InfomationElement;
