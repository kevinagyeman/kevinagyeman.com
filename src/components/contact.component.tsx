import { InformationData } from "@/types/information-schema";
import { Copy, Send } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
type InformationProps = {
  information?: InformationData;
};

const Contact = ({ information }: InformationProps) => {
  const { t } = useTranslation();

  const copyText = () => {
    navigator.clipboard.writeText(`${information?.email || ""}`);
  };

  const sendEmail = () => {
    window.location.href = `mailto:${information?.email || ""}`;
  };

  return (
    <>
      <div className="mt-5" id="contacts">
        <h2 className="mb-2 text-3xl font-semibold">
          {t("contactCard.title")}
        </h2>
        <p className="text-muted-foreground">{t("contactCard.subtitle")}</p>
        <div className="mt-5 flex space-x-2">
          <Input value={information?.email || ""} readOnly />
          <Button
            variant="secondary"
            className="shrink-0"
            onClick={() => copyText()}
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            className="shrink-0"
            onClick={() => sendEmail()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Contact;
