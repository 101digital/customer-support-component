import { RadioButtonItem } from "react-native-theme-component";

export interface CustomerParam {
  app: string;
  platform: string;
  name: string;
  email: string;
  phone: string;
  onPressCountryPicker: () => void;
}

export type SelectCategoryModalSelections = {
  subjectId: string;
  options: RadioButtonItem[];
}