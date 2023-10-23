import { informationDataState } from "@/store/information-store";
import { InformationSchema } from "@/types/information-schema";
import { getInformation, splitSkills } from "@/utils/utils";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Divider from "../ui/divider";
import { Link } from "react-router-dom";

const InformationElement = () => {
  const [information, setInformation] = useRecoilState<InformationSchema>(informationDataState);

  useEffect(() => {
    getInformation(setInformation);
  }, []);

  return (
    <>
      <Button variant="secondary" className="w-full" size={"lg"} asChild>
        <Link to="/dashboard/information-edit">Edit information</Link>
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
