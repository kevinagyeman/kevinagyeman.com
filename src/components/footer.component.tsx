import { Github } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Footer = () => {
  const year = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <>
      <footer>
        <div className="container mt-5 flex h-24 items-center justify-between gap-4">
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="rounded-full" asChild>
              <Link to="https://github.com/kevinagyeman" target="_blank">
                <Github className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full" asChild>
              <Link to="https://www.linkedin.com/in/kevinagyeman/" target="_blank">
                <Github className="h-4 w-4" />
              </Link>
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
