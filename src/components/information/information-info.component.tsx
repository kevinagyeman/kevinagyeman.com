import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { informationService } from "@/services/information.service";
import { informationDataState } from "@/store/information-store";
import { InformationData } from "@/types/information-schema";
import { ChevronLeft } from "lucide-react";
import { useRecoilState } from "recoil";
import { Badge } from "../ui/badge";
import { useState } from "react";

const InformationInfo = () => {
  const [information, setInformation] =
    useRecoilState<InformationData>(informationDataState);
  const [skillsArray, setSkillsArray] = useState<string[]>();

  const getInformation = async () => {
    try {
      const data = await informationService.getById();
      if (data) {
        const currentInformation: InformationData = {
          ...data,
          name: data.name,
        };
        setInformation(currentInformation);
        arraySkills(currentInformation);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const arraySkills = (informationObject: InformationData) => {
    const skillsSplitted = informationObject.skills?.split(",");
    setSkillsArray(skillsSplitted);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" onClick={() => getInformation()}>
          <ChevronLeft className="h-7 w-7 " />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex h-screen w-full flex-col">
        <p className="text-sm text-muted-foreground">
          {information.name} {information.surname}
        </p>
        <div className="mt-5 max-h-max  flex-grow space-y-5 overflow-y-auto">
          <img
            src={information?.profileImageLink}
            className="mb-5 h-32 rounded-full"
          />
          <div className="pb-3 text-lg font-semibold">
            {information.name} {information.surname}
          </div>
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
            {information?.role}
          </code>
          <p className="text-sm text-muted-foreground">{information.summary}</p>
          <p className="text-sm">{information.additionalInfo}</p>
          <div className="mt-3 pb-8">
            {skillsArray?.map((skill: string, index: number) => (
              <Badge variant="secondary" className="mr-2" key={index}>
                {skill}
              </Badge>
            ))}
          </div>
          <a href="#" className="">
            {information.email}
          </a>
        </div>
        <div className="flex space-x-2">
          <Button variant={"secondary"} className="w-3/4">
            Contatti
          </Button>
          <SheetClose asChild>
            <Button variant={"outline"} className="w-1/4">
              Chiudi
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default InformationInfo;
