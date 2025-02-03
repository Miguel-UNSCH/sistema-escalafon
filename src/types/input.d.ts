import { JSX } from "react";

export interface IInputBasicFields {
  label: string;
  name: string;
  placeholder: string;
  icon?: JSX.Element;
  required?: boolean;
  defaultValue?: string;
}

export interface IInputFileLabels {
  label: string;
  name: string;
  icon?: JSX.Element;
  required?: boolean;
  inf?: string;
}

/** start-date to end-date */
export interface IInputDateFields {
  label: string;
  name: string;
  required?: boolean;
  defaultValue?: string;
}
