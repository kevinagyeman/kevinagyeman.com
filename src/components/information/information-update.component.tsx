import { informationService } from "@/services/information.service";
import { informationDataState } from "@/store/information-store";
import { InformationData } from "@/types/information-schema";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import InformationForm from "./information-form.component";

const InformationUpdate = () => {
  const [information, setInformation] =
    useRecoilState<InformationData>(informationDataState);
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);

  const updateInformation = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await informationService.update(information);
      console.log(information);

      setOpen(false);
      setIsInputDisabled(true);
    } catch (e) {
      console.log(e);
    }
  };

  const getInformation = async () => {
    try {
      const data = await informationService.getById();
      if (data) {
        const currentInformation: InformationData = {
          ...data,
          name: data.name,
        };
        setInformation(currentInformation);
        setOpen(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const editInformationButton = () => {
    if (isInputDisabled) {
      setIsInputDisabled(false);
    } else {
      getInformation();
      setIsInputDisabled(true);
    }
  };

  return (
    <>
      <Sheet
        open={open}
        onOpenChange={() => {
          setOpen(false), setIsInputDisabled(true);
        }}
      >
        <SheetTrigger asChild>
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => getInformation()}
          >
            Modifica informazioni
          </Button>
        </SheetTrigger>
        <SheetContent className="flex h-screen w-full flex-col">
          <div className="border-b pb-4">
            <Button
              variant="secondary"
              onClick={() => {
                editInformationButton();
              }}
              className="w-40"
            >
              {isInputDisabled ? "Modifica progetto" : "Annulla modifiche"}
            </Button>
          </div>
          <div className="mt-5 max-h-max  flex-grow space-y-5 overflow-y-auto px-1">
            <InformationForm
              isDisabled={isInputDisabled}
              informationSetter={setInformation}
              submitFunction={updateInformation}
              information={information}
            />
          </div>
          <div className="flex space-x-2 border-t">
            <Button
              type="submit"
              className="mt-3 w-full"
              disabled={isInputDisabled}
              form="form"
            >
              Update
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default InformationUpdate;
