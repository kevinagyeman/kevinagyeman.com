import ProjectsAdd from "@/components/projects-add.component";
import ProjectsList from "../components/projects-list.component";
import Hero from "@/components/hero.component";
import Contact from "@/components/contact.component";
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
