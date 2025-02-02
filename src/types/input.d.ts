export interface IInputBasicData {
  type: "BasicInput";
  fields: Array<IInputBasicFields>;
}

export interface IInputBasicFields {
  label: string;
  name: string;
  placeholder: string;
  icon?: JSX.Element;
  required?: boolean;
  defaultValue?: string;
}
