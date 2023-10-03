import { Github, Linkedin } from "lucide-react";
import { Button } from "./ui/button";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <>
      <footer className="border-t py-6 md:px-8 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Github className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Linkedin className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by Kevin Agyeman | © {year}
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
