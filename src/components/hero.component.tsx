import { ArrowDown, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="container mx-auto  lg:max-w-[50%] lg:py-16">
        <h1 className="scroll-m-20 py-3 text-4xl font-extrabold tracking-tight lg:text-7xl">
          Kevin Agyeman
        </h1>
        <p className="py-3 text-xl text-muted-foreground lg:text-2xl">
          A modal dialog that interrupts the user with important content and
          expects a response.
        </p>
        <div className="mt-3 flex space-x-2">
          <Button variant="secondary">
            Contact <ArrowDown className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline">
            Linkedin
            <Linkedin className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Hero;
