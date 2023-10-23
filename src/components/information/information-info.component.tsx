import { Button } from "@/components/ui/button";
import { informationDataState } from "@/store/information-store";
import { InformationSchema } from "@/types/information-schema";
import { getInformation, splitByLanguage, splitSkills } from "@/utils/utils";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Badge } from "../ui/badge";
import { useTranslation } from "react-i18next";

const InformationInfo = () => {
  const [information, setInformation] = useRecoilState<InformationSchema>(informationDataState);
  const { t } = useTranslation();

  useEffect(() => {
    getInformation(setInformation);
  }, []);

  return (
    <>
      <div className="flex flex-col space-y-6">
        <div>
          <img src={information?.profileImageLink} className="h-44 rounded-full" />
        </div>
        <h2 className="text-3xl font-semibold">
          {information.name} {information.surname}
        </h2>
        <div>
          <code className="relative rounded bg-muted px-[0.4rem] py-[0.2rem] font-mono text-sm">
            {information?.role}
          </code>
        </div>
        <p className=" text-xl text-muted-foreground">{splitByLanguage(`${information?.summary}`)}</p>
        <div>
          {splitSkills(`${information?.skills}`).map((skill: string, index: number) => (
            <Badge variant="secondary" className="mr-2 mt-2" key={index}>
              {skill}
            </Badge>
          ))}
        </div>
        <p className=" text-xl">{splitByLanguage(`${information.additionalInfo}`)}</p>

        <div className="flex space-x-2">
          {information.additionalLink && (
            <Button variant={"secondary"} className="w-full" size={"lg"} asChild>
              <a href={information.additionalLink} target="_blank">
                {t("readCv")} <ArrowUpRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          )}
          <Button variant={"outline"} size={"lg"} asChild className="ml-auto">
            <a href="/">
              <ArrowLeft className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </>
  );
};

export default InformationInfo;
