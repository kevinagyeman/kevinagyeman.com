import { informationDataState } from "@/store/information-store";
import { InformationData } from "@/types/information-schema";
import { splitSkills } from "@/utils/utils";
import { useRecoilValue } from "recoil";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Divider from "../ui/divider";

const InformationElement = () => {
  const information = useRecoilValue<InformationData>(informationDataState);
  return (
    <>
      <Button variant="secondary" className="w-full" size={"lg"} asChild>
        <a href="/dashboard/information-edit">Edit information</a>
      </Button>
      <Divider title={"Info"} />
      <div className="flex flex-col space-y-4">
        <p className="text-sm text-muted-foreground">{information?.email}</p>
        <div>
          <img src={information?.profileImageLink} className="h-32 rounded-full" />
        </div>
        <h4 className="text-xl font-semibold">
          {information?.name} {information?.surname}
        </h4>
        <p>{information?.role}</p>
        <p className="text-muted-foreground">{information?.summary}</p>
        <div className="flex flex-wrap gap-2">
          {splitSkills(`${information?.skills}`).map((skill, index) => (
            <div key={index}>
              <Badge variant="secondary">{skill}</Badge>
            </div>
          ))}
        </div>

        <p>{information?.additionalInfo || "-"}</p>
      </div>
    </>
  );
};

export default InformationElement;
