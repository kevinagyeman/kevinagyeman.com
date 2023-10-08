import InfomationElement from "@/components/information/information-element.component";
import ProjectsListAdmin from "@/components/project/projects-list-admin.component";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  return (
    <>
      <div className="container">
        <h1 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-5xl">
          Dashboard
        </h1>
        <p className="mb-5 mt-3 text-muted-foreground">
          Enter your email address.
        </p>

        <Tabs defaultValue="projects">
          <TabsList className="grid w-[250px] grid-cols-2">
            <TabsTrigger value="projects">Progetti</TabsTrigger>
            <TabsTrigger value="information">Informazioni</TabsTrigger>
          </TabsList>
          <TabsContent value="projects">
            <ProjectsListAdmin />
          </TabsContent>
          <TabsContent value="information">
            <InfomationElement />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Dashboard;
