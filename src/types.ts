import { RadioButtonItem } from "react-native-theme-component";

export type SelectCategoryModalSelections = {
  subjectId: string;
  options: RadioButtonItem[];
}


export type ClientData = {
  name: string;
  email: string;
  phone: string;
  message: string;
  type: string;
  appId: string;
  attachment?: any;
}
