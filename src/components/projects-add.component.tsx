import { useState } from 'react';
import { projectService } from '../services/project.service';
import { ProjectData } from '../types/project-schema';

const ProjectsAdd = () => {
  const [project, setProject] = useState<ProjectData>({
    title: '',
    info: '',
    description: '',
    image: [],
    link: '',
  });

  const addProject = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await projectService.create(project);
      console.log('fatto');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <form onSubmit={addProject}>
        <label>title:</label>
        <br />
        <input
          type='text'
          placeholder='title'
          value={project.title}
          onChange={(e) => {
            setProject({ ...project, title: e.target.value });
          }}
        />
        <br />
        <button type='submit'>submit</button>
      </form>
    </>
  );
};

export default ProjectsAdd;
