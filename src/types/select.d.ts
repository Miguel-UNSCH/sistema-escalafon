export interface ISelectOption {
  value: string;
  label: string;
}

export interface IBasicSelectFields {
  label: string;
  name: string;
  icon?: JSX.Element;
  required?: boolean;
  defaultValue?: string;
  options: Array<ISelectOption>;
}
