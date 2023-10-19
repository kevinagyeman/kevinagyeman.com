import { InformationData } from "@/types/information-schema";
import { splitByLanguage, splitSkills } from "@/utils/utils";
import { Send } from "lucide-react";
import { useTranslation } from "react-i18next";
import InformationInfo from "./information/information-info.component";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

type InformationProps = {
  information?: InformationData;
};

const Hero = ({ information }: InformationProps) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="mx-auto  mb-8">
        <code className="relative rounded bg-muted px-[0.4rem] py-[0.2rem] font-mono text-sm">
          {information?.role}
        </code>
        <h1 className="scroll-m-20  py-3 text-5xl font-extrabold tracking-tight">
          {information?.name} {information?.surname}
        </h1>
        <p className="text-l mt-2 text-muted-foreground lg:text-xl">
          {splitByLanguage(`${information?.summary}`)}
        </p>
        <div className="mt-2">
          {splitSkills(`${information?.skills}`, 5).map((skill, index) => (
            <Badge variant="secondary" className="mr-2" key={index}>
              {skill}
            </Badge>
          ))}
        </div>
        <div className="mt-6">
          <Button className="mr-2" variant={"secondary"} asChild>
            <a href="#contacts">
              {t("hero.contactButton")}
              <Send className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <InformationInfo />
        </div>
      </div>
    </>
  );
};

export default Hero;
