import InformationElement from "@/components/information/information-element.component";
import ProjectsListAdmin from "@/components/project/projects-list-admin.component";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  return (
    <>
      <div className="text-center">
        <h1 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-5xl">Dashboard</h1>
        <p className="mb-5 mt-3 text-muted-foreground">Edit data about website</p>
      </div>
      <Tabs defaultValue="projects">
        <TabsList className="mb-10 grid grid-cols-2">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="information">Information</TabsTrigger>
        </TabsList>
        <TabsContent value="projects">
          <ProjectsListAdmin />
        </TabsContent>
        <TabsContent value="information">
          <InformationElement />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Dashboard;
