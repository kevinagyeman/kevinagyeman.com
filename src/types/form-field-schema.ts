export type FormFieldSchema = {
  label: string;
  type?: React.HTMLInputTypeAttribute;
  value?: string | number | readonly string[];
  disabled?: boolean;
  required?: boolean;
  hint?: string;
  onChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>): void;
};
