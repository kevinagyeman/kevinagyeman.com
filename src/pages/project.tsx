import ProjectsInfo from "@/components/project/projects-info.component";
import { useParams } from "react-router-dom";

export default function Project() {
  const { id } = useParams();

  if (id) {
    return (
      <>
        <ProjectsInfo projectId={id} />
      </>
    );
  }
}
