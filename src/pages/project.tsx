import ProjectsInfo from "@/components/project/projects-info.component";
import { useParams } from "react-router-dom";

export default function Project() {
  const { id } = useParams();

  return (
    <>
      <ProjectsInfo projectId={id} />
    </>
  );
}
