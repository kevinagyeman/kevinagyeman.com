import { informationService } from "@/services/information.service";
import { informationDataState } from "@/store/information-store";
import { InformationData } from "@/types/information-schema";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import InformationUpdate from "./information-update.component";

const InfomationElement = () => {
  const [information, setInformation] =
    useRecoilState<InformationData>(informationDataState);

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

      <div className="mb-4">
        <img
          src={information?.profileImageLink}
          className="mb-5 h-32 rounded-full"
        />
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          {information?.name} {information?.surname}
        </h4>
        {information?.role}
        <br />
        {information?.skills}
        <br />
        <p className="mt-2 text-sm text-muted-foreground">
          {information?.summary}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {information?.additionalInfo || "-"}
        </p>
      </div>
    </>
  );
};

export default InfomationElement;
