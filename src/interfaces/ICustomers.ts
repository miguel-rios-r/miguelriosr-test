import { JSX } from "react";

interface IFormItemOption {
  value: string | number;
  label: JSX.Element;
}

export interface ICustomerFormItem {
  label: string;
  name: string;
  type: "input" | "select" | "customerType" | "conditionedInput" | "date" ;
  options?: IFormItemOption[];
  col: number
}

export interface ICustomer {
  id: number;
  customerType: number;
  name: string;
  surname: string;
  companyName: string;
  companyContact: string;
  document: string;
  age: number;
  dateOfBirth: number;
  mainTourReference: string;
  phone: string;
  language: number;
  adress: string;
  email: string;
  reference: string;
  travelCode: string;
  passengers: number;
}