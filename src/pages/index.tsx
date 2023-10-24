import Contact from "@/components/contact.component";
import Hero from "@/components/hero.component";
import ProjectsListUser from "@/components/project/projects-list-user.component";

export default function Index() {
  return (
    <>
      <section id="home">
        <Hero />
      </section>
      <section id="projects">
        <ProjectsListUser />
      </section>
      <section id="contacts">
        <Contact />
      </section>
    </>
  );
}
