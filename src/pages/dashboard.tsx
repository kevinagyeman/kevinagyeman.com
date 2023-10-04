import ProjectsList from "@/components/projects-list.component";

const Dashboard = () => {
  return (
    <>
      <div className="container">
        <h1 className="mb-3 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Dashboard
        </h1>
        <p className="text-xl text-muted-foreground">
          A modal dialog that interrupts the user with important content and
          expects a response.
        </p>
      </div>
      <ProjectsList />
    </>
  );
};

export default Dashboard;
