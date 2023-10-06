import { InformationData } from "@/types/information-schema";
import React from "react";
import { useTranslation } from "react-i18next";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

type InformationFormData = {
  information: InformationData;
  isDisabled: boolean;
  informationSetter: React.Dispatch<React.SetStateAction<InformationData>>;
  submitFunction(e: React.FormEvent<HTMLFormElement>): Promise<void>;
};

const InformationForm = ({
  information,
  isDisabled,
  informationSetter,
  submitFunction,
}: InformationFormData) => {
  const { t } = useTranslation();

  return (
    <>
      <form onSubmit={(e) => submitFunction(e)} id="form">
        <div className="mb-2">
          <Label>{t("informationForm.name")}</Label>
          <Input
            required={true}
            type="text"
            placeholder={t("informationForm.name")}
            value={information.name || ""}
            onChange={(e) => {
              informationSetter({ ...information, name: e.target.value });
            }}
            disabled={isDisabled}
          />
        </div>
        <div className="mb-2">
          <Label>{t("informationForm.surname")}</Label>
          <Input
            type="text"
            placeholder={t("informationForm.surname")}
            value={information.surname || ""}
            onChange={(e) => {
              informationSetter({ ...information, surname: e.target.value });
            }}
            disabled={isDisabled}
          />
        </div>
        <div className="mb-2">
          <Label>{t("informationForm.role")}</Label>
          <Input
            type="text"
            placeholder={t("informationForm.role")}
            value={information.role || ""}
            onChange={(e) => {
              informationSetter({ ...information, role: e.target.value });
            }}
            disabled={isDisabled}
          />
        </div>
        <div className="mb-2">
          <Label>{t("informationForm.summary")}</Label>
          <Textarea
            placeholder={t("informationForm.summary")}
            value={information.summary || undefined}
            onChange={(e) => {
              informationSetter({
                ...information,
                summary: e.target.value,
              });
            }}
            disabled={isDisabled}
            maxLength={150}
            rows={4}
          ></Textarea>
        </div>
        <div className="mb-2">
          <Label>{t("informationForm.profileImageLink")}</Label>
          <Input
            type="text"
            placeholder={t("informationForm.profileImageLink")}
            value={information.profileImageLink || ""}
            onChange={(e) => {
              informationSetter({
                ...information,
                profileImageLink: e.target.value,
              });
            }}
            disabled={isDisabled}
          />
        </div>
        <div className="mb-2">
          <Label>{t("informationForm.skills")}</Label>
          <Textarea
            placeholder={t("informationForm.skills")}
            value={information.skills || undefined}
            onChange={(e) => {
              informationSetter({
                ...information,
                skills: e.target.value,
              });
            }}
            disabled={isDisabled}
            maxLength={150}
            rows={4}
          ></Textarea>
          <small className="text-muted-foreground">
            Separa con una virgola per ogni skill
          </small>
        </div>
        <div className="mb-2">
          <Label>{t("informationForm.additionalInfo")}</Label>
          <Textarea
            placeholder={t("informationForm.additionalInfo")}
            value={information.additionalInfo || undefined}
            onChange={(e) => {
              informationSetter({
                ...information,
                additionalInfo: e.target.value,
              });
            }}
            disabled={isDisabled}
            maxLength={150}
            rows={4}
          ></Textarea>
        </div>
      </form>
    </>
  );
};

export default InformationForm;
