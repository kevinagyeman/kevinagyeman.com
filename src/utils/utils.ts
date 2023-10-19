import i18n from "@/i18n";

export const splitByLanguage = (string: string): string => {
  const itString = string.split("ENG")[0];
  const enString = string.split("ENG")[1];

  if (i18n.language === "en") {
    return enString;
  } else {
    return itString;
  }
};

export const splitSkills = (
  string: string,
  numberOfEelementsDisplayed?: number,
): string[] => {
  const splittedString = string.split(",");
  if (!numberOfEelementsDisplayed) {
    return splittedString;
  } else {
    return splittedString.slice(0, numberOfEelementsDisplayed);
  }
};
