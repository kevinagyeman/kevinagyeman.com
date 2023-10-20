import { Button } from "@/components/ui/button";
import { informationService } from "@/services/information.service";
import { informationDataState } from "@/store/information-store";
import { InformationData } from "@/types/information-schema";
import { splitByLanguage, splitSkills } from "@/utils/utils";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Badge } from "../ui/badge";

const InformationInfo = () => {
  const [information, setInformation] =
    useRecoilState<InformationData>(informationDataState);
  // const { t } = useTranslation();

  const getInformation = async () => {
    try {
      const data = await informationService.getById();
      if (data) {
        const currentInformation: InformationData = {
          ...data,
          name: data.name,
        };
        setInformation(currentInformation);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getInformation();
  }, []);

  return (
    <>
      <div className="flex flex-col space-y-6">
        <div>
          <img
            src={information?.profileImageLink}
            className="h-44 rounded-full"
          />
        </div>
        <h2 className="text-3xl font-semibold">
          {information.name} {information.surname}
        </h2>
        <div>
          <code className="relative rounded bg-muted px-[0.4rem] py-[0.2rem] font-mono text-sm">
            {information?.role}
          </code>
        </div>
        <p className="text-xl text-muted-foreground">
          {splitByLanguage(`${information?.summary}`)}
        </p>
        <p className="text-xl">{information.additionalInfo}</p>
        <div>
          {splitSkills(`${information?.skills}`).map(
            (skill: string, index: number) => (
              <Badge variant="secondary" className="mr-2 mt-2" key={index}>
                {skill}
              </Badge>
            ),
          )}
        </div>
        <div className="flex space-x-2">
          <Button variant={"secondary"} className="w-3/4" size={"lg"}>
            Contatti
          </Button>
          <Button variant={"outline"} className="w-1/4" size={"lg"} asChild>
            <a href="/">Indietro</a>
          </Button>
        </div>
      </div>
    </>
  );
};

export default InformationInfo;
