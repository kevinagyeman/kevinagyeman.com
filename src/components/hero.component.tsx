import { informationDataState } from "@/store/information-store";
import { InformationSchema } from "@/types/information-schema";
import { getInformation, splitByLanguage, splitSkills } from "@/utils/utils";
import { ChevronRight, Send } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import SkeletonLoader from "./skeleton.component";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const Hero = () => {
  const { t } = useTranslation();
  const [information, setInformation] = useRecoilState<InformationSchema>(informationDataState);

  useEffect(() => {
    getInformation(setInformation);
  }, []);

  return (
    <>
      {!information.id ? (
        <SkeletonLoader />
      ) : (
        <div
          className="mb-8 
        flex flex-col space-y-5"
        >
          <div>
            <code className="relative rounded bg-muted px-[0.4rem] py-[0.2rem] font-mono text-sm">
              {information?.role}
            </code>
          </div>
          <h1 className="text-4xl font-extrabold lg:text-5xl">
            {information?.name} {information?.surname}
          </h1>
          <p className="text-l line-clamp-2 text-muted-foreground lg:text-xl">
            {splitByLanguage(`${information?.summary}`)}
          </p>
          <div className="flex flex-wrap gap-3">
            {splitSkills(`${information?.skills}`, 5).map((skill, index) => (
              <Badge variant="secondary" key={index}>
                {skill}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant={"secondary"} size={"lg"} asChild>
              <Link to="/contact">
                {t("hero.contactButton")}
                <Send className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant={"outline"} size={"lg"} asChild>
              <Link to="/information">
                {t("hero.readMoreButton")}
                <ChevronRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
