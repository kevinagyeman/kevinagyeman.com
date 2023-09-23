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
import { ModeToggle } from './ui/mode-toggle';

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
      <ModeToggle />
      <div className='container grid lg:grid-cols-3'>
        {projects?.map((project: ProjectData, index: number) => (
          <Card key={index} className='m-4'>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export default ProjectsList;
