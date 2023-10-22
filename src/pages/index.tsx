import Contact from "@/components/contact.component";
import Hero from "@/components/hero.component";
import ProjectsListUser from "@/components/project/projects-list-user.component";

const Index = () => {
  return (
    <>
      <section id="home">
        <Hero />
      </section>
      <section id="projects">
        <ProjectsListUser />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </>
  );
};

export default Index;
