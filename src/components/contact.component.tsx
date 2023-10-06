import { Copy, Send } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="container mt-5 pb-24 lg:max-w-[50%]">
        <Card>
          <CardHeader>
            <CardTitle>{t("contactCard.title")}</CardTitle>
            <CardDescription>{t("contactCard.subtitle")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Input value="kevinagyemann@mail.com" readOnly />
              <Button variant="secondary" className="shrink-0">
                <Copy className="mr-2 h-4 w-4" />
                Copy email
              </Button>
              <Button variant="secondary" className="shrink-0">
                <Send className="mr-2 h-4 w-4" />
                Send email
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Contact;
