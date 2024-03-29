import { Button } from "@/components/ui/button";
import { informationDataState } from "@/store/information-store";
import { InformationSchema } from "@/types/information-schema";
import { getInformation, splitByLanguage } from "@/utils/utils";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import SkillsList from "../skills-list.component";

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
        <SkillsList string={`${information?.skills}`} />
        <p className=" text-xl">{splitByLanguage(`${information.additionalInfo}`)}</p>

        <div className="flex space-x-2">
          {information.additionalLink && (
            <Button variant={"secondary"} className="w-full" size={"lg"} asChild>
              <Link to={information.additionalLink} target="_blank">
                {t("readCv")} <ArrowUpRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          )}
          <Button variant={"outline"} size={"lg"} asChild className="ml-auto">
            <Link to="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default InformationInfo;
