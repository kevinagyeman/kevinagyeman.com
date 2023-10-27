import { FormFieldSchema } from "@/types/form-field-schema";
import { InformationSchema } from "@/types/information-schema";
import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

type InformationFormData = {
  information: InformationSchema;
  isDisabled: boolean;
  informationSetter: React.Dispatch<React.SetStateAction<InformationSchema>>;
  submitFunction(e: React.FormEvent<HTMLFormElement>): Promise<void>;
};

const InformationForm = ({ information, isDisabled, informationSetter, submitFunction }: InformationFormData) => {
  const formFields: FormFieldSchema[] = [
    {
      label: "Name",
      type: "text",
      value: information.name || "",
      disabled: isDisabled,
      required: false,
      onChange: (e) => {
        informationSetter({ ...information, name: e.target.value });
      },
    },
    {
      label: "Surname",
      type: "text",
      value: information.surname || "",
      disabled: isDisabled,
      required: false,
      onChange: (e) => {
        informationSetter({ ...information, surname: e.target.value });
      },
    },
    {
      label: "Email",
      type: "text",
      value: information.email || "",
      disabled: isDisabled,
      required: false,
      onChange: (e) => {
        informationSetter({ ...information, email: e.target.value });
      },
    },
    {
      label: "Profile Image Link",
      type: "text",
      value: information.profileImageLink || "",
      disabled: isDisabled,
      required: false,
      onChange: (e) => {
        informationSetter({ ...information, profileImageLink: e.target.value });
      },
    },

    {
      label: "Role",
      type: "text",
      value: information.role || "",
      disabled: isDisabled,
      required: false,
      onChange: (e) => {
        informationSetter({ ...information, role: e.target.value });
      },
    },
    {
      label: "Additional link",
      type: "text",
      value: information.additionalLink || "",
      disabled: isDisabled,
      required: false,
      onChange: (e) => {
        informationSetter({ ...information, additionalLink: e.target.value });
      },
    },

    {
      label: "Skills",
      type: "textarea",
      value: information.skills || "",
      disabled: isDisabled,
      required: false,
      onChange: (e) => {
        informationSetter({ ...information, skills: e.target.value });
      },
    },
    {
      label: "Summary",
      type: "textarea",
      value: information.summary || "",
      disabled: isDisabled,
      required: false,
      onChange: (e) => {
        informationSetter({ ...information, summary: e.target.value });
      },
    },
    {
      label: "Additional Information",
      type: "textarea",
      value: information.additionalInfo || "",
      disabled: isDisabled,
      required: false,
      onChange: (e) => {
        informationSetter({ ...information, additionalInfo: e.target.value });
      },
    },
  ];

  return (
    <>
      <form onSubmit={(e) => submitFunction(e)} id="form">
        {formFields.map((field: FormFieldSchema, index: number) => (
          <div className="my-5" key={index}>
            {field.type === "text" ? (
              <>
                <Label>{field.label}</Label>
                <Input
                  className="mt-1"
                  required={field.required}
                  type={field.type}
                  placeholder={field.label}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={field.disabled}
                />
              </>
            ) : (
              <>
                <Label>{field.label}</Label>
                <Textarea
                  className="mt-1"
                  placeholder={field.label}
                  value={field?.value}
                  onChange={field.onChange}
                  disabled={field.disabled}
                  rows={14}
                ></Textarea>
              </>
            )}
          </div>
        ))}
      </form>
    </>
  );
};

export default InformationForm;
