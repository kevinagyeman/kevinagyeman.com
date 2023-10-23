import { informationService } from "@/services/information.service";
import { informationDataState } from "@/store/information-store";
import { InformationSchema } from "@/types/information-schema";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Button } from "../ui/button";
import InformationForm from "./information-form.component";
import { getInformation } from "@/utils/utils";

export default function InformationUpdate() {
  const [information, setInformation] = useRecoilState<InformationSchema>(informationDataState);
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(true);

  const updateInformation = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await informationService.update(information);
      setIsInputDisabled(true);
    } catch (e) {
      console.log(e);
    }
  };

  const editInformationButton = () => {
    if (isInputDisabled) {
      setIsInputDisabled(false);
    } else {
      getInformation(setInformation);
      setIsInputDisabled(true);
    }
  };

  useEffect(() => {
    getInformation(setInformation);
  }, []);

  return (
    <>
      <div className="my-8 flex flex-row gap-x-3">
        <Button
          variant="secondary"
          onClick={() => {
            editInformationButton();
          }}
        >
          {isInputDisabled ? "Edit" : "Undo"}
        </Button>
        <Button type="submit" disabled={isInputDisabled} form="form">
          Update
        </Button>
        <Button variant="outline" size={"icon"} className="ml-auto w-[50px]" asChild>
          <a href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </a>
        </Button>
      </div>
      <InformationForm
        isDisabled={isInputDisabled}
        informationSetter={setInformation}
        submitFunction={updateInformation}
        information={information}
      />
      <Button type="submit" className="mt-3 w-full" disabled={isInputDisabled} form="form">
        Update
      </Button>
    </>
  );
}
