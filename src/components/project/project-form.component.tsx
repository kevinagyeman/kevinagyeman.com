import { projectSchema } from "@/types/project-schema";
import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import { FormFieldSchema } from "@/types/form-field-schema";

type ProjectFormData = {
  project: projectSchema;
  isDisabled: boolean;
  projectSetter: React.Dispatch<React.SetStateAction<projectSchema>>;
  submitFunction(e: React.FormEvent<HTMLFormElement>): Promise<void>;
};

export default function ProjectForm({
  project,
  isDisabled,
  projectSetter,
  submitFunction,
}: ProjectFormData) {
  const formFields: FormFieldSchema[] = [
    {
      label: "Title",
      type: "text",
      value: project?.title || "",
      disabled: isDisabled,
      required: true,
      onChange: (e) => {
        projectSetter({ ...project, title: e.target.value });
      },
    },
    {
      label: "Link",
      type: "text",
      value: project?.link || "",
      disabled: isDisabled,
      required: false,
      onChange: (e) => {
        projectSetter({ ...project, link: e.target.value });
      },
    },
    {
      label: "Image link",
      type: "text",
      value: project?.imageLink || "",
      disabled: isDisabled,
      required: false,
      onChange: (e) => {
        projectSetter({ ...project, imageLink: e.target.value });
      },
    },
    {
      label: "Skills",
      type: "textarea",
      value: project?.skills || "",
      disabled: isDisabled,
      required: false,
      onChange: (e) => {
        projectSetter({ ...project, skills: e.target.value });
      },
    },
    {
      label: "Description",
      type: "textarea",
      value: project?.description || "",
      disabled: isDisabled,
      required: false,
      onChange: (e) => {
        projectSetter({ ...project, description: e.target.value });
      },
    },
    {
      label: "Short Description",
      type: "textarea",
      value: project?.shortDescription || "",
      disabled: isDisabled,
      required: false,
      onChange: (e) => {
        projectSetter({ ...project, shortDescription: e.target.value });
      },
    },
  ];

  return (
    <>
      <form onSubmit={(e) => submitFunction(e)} id="form">
        <div className="mb-4 flex items-center space-x-2">
          <Switch
            id="status-mode"
            onCheckedChange={(e) => {
              projectSetter({ ...project, isPublished: e.valueOf() });
            }}
            checked={project?.isPublished}
            disabled={isDisabled}
          />
          <Label htmlFor="status-mode">
            {project?.isPublished ? "Published" : "Draft"}
          </Label>
        </div>

        {formFields.map((field: FormFieldSchema, index: number) => (
          <div className="my-5" key={index}>
            {field.type === "text" ? (
              <>
                <Label>{field.label}</Label>
                <Input
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
                  placeholder={field.label}
                  value={field.value}
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
}
