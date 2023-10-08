import Contact from "@/components/contact.component";
import Hero from "@/components/hero.component";
import ProjectsListUser from "@/components/project/projects-list-user.component";
import { informationService } from "@/services/information.service";
import { InformationData } from "@/types/information-schema";
import { useEffect, useState } from "react";
const Index = () => {
  const [information, setInformation] = useState<InformationData>();
  const [skillsArray, setSkillsArray] = useState<string[]>();

  const arraySkills = (informationObject: InformationData) => {
    const skillsSplitted = informationObject.skills?.split(",");
    setSkillsArray(skillsSplitted);
  };

  const getInformation = async () => {
    const data = await informationService.getById();
    if (data) {
      const currentInformation: InformationData = { ...data, name: data.name };
      arraySkills(currentInformation);
      setInformation(currentInformation);
    }
  };

  useEffect(() => {
    getInformation();
  }, []);
  return (
    <>
      <section id="home">
        <Hero skillsArray={skillsArray} information={information} />
      </section>
      <section id="projects">
        <ProjectsListUser />
      </section>
      <section id="contact">
        <Contact information={information} />
      </section>
    </>
  );
};

export default Index;
