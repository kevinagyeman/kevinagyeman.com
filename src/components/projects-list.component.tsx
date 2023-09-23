import { useState, useEffect } from 'react';
import { projectService } from '../services/project.service';
import { ProjectData } from '../types/project-schema';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>

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
