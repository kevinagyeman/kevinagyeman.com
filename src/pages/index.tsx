import ProjectsAdd from "@/components/projects-add.component";
import ProjectsList from "../components/projects-list.component";
const Index = () => {
  return (
    <>
      <div className="container">
        <h1 className="mb-3 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          kevin agyeman
        </h1>
        <p className="text-xl text-muted-foreground">
          project personal website
        </p>
      </div>
      <ProjectsList />
    </>
  );
};

export default Index;
