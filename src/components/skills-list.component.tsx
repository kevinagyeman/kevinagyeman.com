import { splitSkills } from "@/utils/utils";
import { Badge } from "./ui/badge";

type SkillsListProps = {
  string: string;
  numberOfSkills?: number;
};

export default function SkillsList({ string, numberOfSkills }: SkillsListProps) {
  return (
    <div className="flex flex-wrap gap-x-3 gap-y-3">
      {splitSkills(`${string}`, numberOfSkills).map((skill, index) => (
        <Badge variant="secondary" key={index} className="font-normal">
          # {skill}
        </Badge>
      ))}
    </div>
  );
}
