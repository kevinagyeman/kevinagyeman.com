import ProjectsUpdate from "@/components/project/projects-update.component";
import { useParams } from "react-router-dom";

export default function ProjectEdit() {
  const { id } = useParams();
  if (id) {
    return (
      <>
        <h2 className="mb-5 text-3xl font-semibold">Edit Project</h2>
        <ProjectsUpdate projectId={id} />
      </>
    );
  }
}
