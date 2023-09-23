import { useEffect, useState } from 'react';
import { projectService } from '../services/project.service';
import { ProjectData } from '../types/project-schema';

const ProjectsList = () => {
  const [projects, setProjects] = useState<ProjectData[]>();

  const getProjects = async () => {
    try {
      const result = await projectService.getAll();
      setProjects(result);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProjects();
    console.log('progetti', projects);
  }, []);
  return (
    <>
      {projects?.map((project: ProjectData, index: number) => (
        <p key={index}>
          <br />
          {project.id}
          <br />
          {project.title}
          <br />
        </p>
      ))}
    </>
  );
};

export default ProjectsList;
