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

/** start-date to end-date */
export interface ISelectDateFields {
  label: string;
  name: string;
  icon?: JSX.Element;
  required?: boolean;
  defaultValue?: string;
  from: Date;
  to: Date;
}
