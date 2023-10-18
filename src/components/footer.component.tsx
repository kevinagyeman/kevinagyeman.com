import { Github, Linkedin } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const year = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <>
      <footer>
        <div className="mb-5 flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <a href="https://github.com/kevinagyeman" target="_blank">
                <Github className="h-4 w-4" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              asChild
            >
              <a
                href="https://www.linkedin.com/in/kevinagyeman/"
                target="_blank"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </Button>
          </div>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            {t("footer.credit") + year}
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
