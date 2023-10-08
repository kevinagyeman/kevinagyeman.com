import { informationService } from "@/services/information.service";
import { InformationData } from "@/types/information-schema";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    getInformation();
  }, []);

  return (
    <>
      <div className=" pb-5">
        <div className="text-right">
          <InformationUpdate />
        </div>
      </div>

      <div className=" rounded-lg border p-4">
        <h1 className="mb-3 scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl">
          {information?.name} {information?.surname}
        </h1>
        <p className="leading-7 ">
          Image link: {information?.profileImageLink}
        </p>
        <p className="leading-7 text-muted-foreground">
          Role: {information?.role}
        </p>
        <p className="leading-7 text-muted-foreground">
          Summary: {information?.summary}
        </p>
        <p className="leading-7 text-muted-foreground">
          Skills: {information?.skills}
        </p>
        <p className="leading-7 text-muted-foreground">
          Additional Info: {information?.additionalInfo}
        </p>
      </div>
    </>
  );
};

export default InfomationElement;
