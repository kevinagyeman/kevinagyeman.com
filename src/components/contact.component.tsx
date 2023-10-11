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
import { InformationData } from "@/types/information-schema";

type InformationProps = {
  information?: InformationData;
};

const Contact = ({ information }: InformationProps) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="mt-5 pb-5">
        <Card>
          <CardHeader>
            <CardTitle>{t("contactCard.title")}</CardTitle>
            <CardDescription>{t("contactCard.subtitle")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Input value={information?.email || ""} readOnly />
              <Button
                variant="secondary"
                className="shrink-0"
                onClick={() => {
                  navigator.clipboard.writeText("");
                }}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="secondary" className="shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Contact;
