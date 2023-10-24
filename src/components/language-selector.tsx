import i18n from "@/i18n";
import { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export default function LanguageSelector() {
  const detectLanguage = (): string => {
    if (i18n.language === "it" || i18n.language === "it-IT") {
      return "it-IT";
    } else {
      return "en-GB";
    }
  };

  const [language, setLanguage] = useState<string>(detectLanguage());

  const selectLanguage = (e: string) => {
    const valueSelected = e.valueOf();
    i18n.changeLanguage(valueSelected);
    setLanguage(valueSelected);
  };

  return (
    <Select
      onValueChange={(e) => {
        selectLanguage(e);
      }}
      value={language}
    >
      <SelectTrigger className="mx-1 w-[60px] border-none bg-transparent focus:border-transparent focus:ring-transparent">
        <SelectValue placeholder="Select a a language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="it-IT">IT</SelectItem>
          <SelectItem value="en-GB">EN</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
