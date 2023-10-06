import Contact from "@/components/contact.component";
import Hero from "@/components/hero.component";
import ProjectsList from "@/components/project/projects-list.component";
const Index = () => {
  return (
    <>
      <section id="home">
        <Hero />
      </section>
      <section id="projects">
        <ProjectsList />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </>
  );
};

export default Index;
