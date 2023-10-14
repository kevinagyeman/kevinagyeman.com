import { ProjectData } from "@/types/project-schema";
import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";

type ProjectFormData = {
  project: ProjectData;
  isDisabled: boolean;
  projectSetter: React.Dispatch<React.SetStateAction<ProjectData>>;
  submitFunction(e: React.FormEvent<HTMLFormElement>): Promise<void>;
};

export default function ProjectForm({
  project,
  isDisabled,
  projectSetter,
  submitFunction,
}: ProjectFormData) {
  // type InputData = {
  //   label: string;
  //   type?: React.HTMLInputTypeAttribute;
  //   value?: string | number | readonly string[];
  //   disabled?: boolean;
  //   required?: boolean;
  //   onChange?: React.ChangeEventHandler<HTMLInputElement>;
  // };

  // const formFields: InputData[] = [
  //   {
  //     label: "f",
  //     type: "fff",
  //     value: "3443",
  //     disabled: true,
  //     required: true,
  //     onChange: (e) => {
  //       projectSetter({ ...project, link: e.target.value });
  //     },
  //   },
  // ];
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
            {project?.isPublished ? "Pubblicato" : "Bozza"}
          </Label>
        </div>

        <div className="mb-2">
          <Label>Title</Label>
          <Input
            required={true}
            type="text"
            placeholder="title"
            value={project.title || ""}
            onChange={(e) => {
              projectSetter({ ...project, title: e.target.value });
            }}
            disabled={isDisabled}
          />
        </div>
        <div className="mb-2">
          <Label>Short Description</Label>
          <Textarea
            placeholder="title"
            value={project.shortDescription || undefined}
            onChange={(e) => {
              projectSetter({
                ...project,
                shortDescription: e.target.value,
              });
            }}
            disabled={isDisabled}
            maxLength={150}
            rows={4}
          ></Textarea>
        </div>
        <div className="mb-2">
          <Label>Description</Label>
          <Textarea
            placeholder="title"
            value={project.description}
            onChange={(e) => {
              projectSetter({ ...project, description: e.target.value });
            }}
            disabled={isDisabled}
            rows={14}
          ></Textarea>
        </div>
        {/* <CustomInput
          label={"Link"}
          type={"text"}
          value={project?.link || ""}
          onChange={(e) => {
            projectSetter({ ...project, link: e.target.value });
          }}
          disabled={isDisabled}
        /> */}
      </form>
    </>
  );
}

// type InputData = {
//   label: string;
//   type?: React.HTMLInputTypeAttribute;
//   value?: string | number | readonly string[];
//   disabled?: boolean;
//   required?: boolean;
//   onChange?: React.ChangeEventHandler<HTMLInputElement>;
// };

// const CustomInput = ({
//   label,
//   type,
//   value,
//   disabled,
//   required,
//   onChange,
// }: InputData) => {
//   return (
//     <div className="">
//       <Label>{label}</Label>
//       <Input
//         type={type}
//         placeholder={label}
//         value={value}
//         onChange={onChange}
//         disabled={disabled}
//         required={required}
//       />
//     </div>
//   );
// };
