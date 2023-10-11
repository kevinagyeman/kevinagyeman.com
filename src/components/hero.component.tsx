import { InformationData } from "@/types/information-schema";
import { Badge } from "./ui/badge";
import InformationInfo from "./information/information-info.component";

type InformationProps = {
  information?: InformationData;
  skillsArray?: string[];
};

const Hero = ({ information, skillsArray }: InformationProps) => {
  return (
    <>
      <div className="mx-auto  mb-8">
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {information?.role}
        </code>
        <h1 className="scroll-m-20  py-3 text-5xl font-extrabold tracking-tight  lg:text-6xl">
          {information?.name} {information?.surname}
        </h1>
        <p className="text-l py-2 text-muted-foreground lg:text-xl">
          {information?.summary}
        </p>
        <div className="flex items-center">
          <div className="mt-3">
            {skillsArray?.map((skill, index) => (
              <Badge variant="secondary" className="mr-2" key={index}>
                {skill}
              </Badge>
            ))}
          </div>
          <div className="ml-auto">
            <InformationInfo />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
