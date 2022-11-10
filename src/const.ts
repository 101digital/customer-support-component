import { RadioButtonItem } from "react-native-theme-component";
import { SelectCategoryModalSelections } from "./types";

export const subjectSelections: RadioButtonItem[] = [
    { value: '1', title: 'Account Registration' },
    { value: '2', title: 'Account Management' },
    { value: '3', title: 'Payment and Transfers' },
    { value: '4', title: 'Account security' },
    { value: '5', title: 'Fraud and disputes' },
    { value: '6', title: 'Change request' },
    { value: '7', title: 'Other requests' },
  ];
  
export const categorySelections: SelectCategoryModalSelections[] = [
    { 
      subjectId: '1',
      options: [
        {value: '1', title: 'OTP verification'},
        {value: '2', title: 'Account eligibility'},
        {value: '3', title: 'Account opening'},
        {value: '4', title: 'Identity verification'},
        {value: '5', title: 'Other issues'}
      ] 
    },
    { 
      subjectId: '2',
      options: [
        {value: '1', title: 'Account access'},
        {value: '2', title: 'App functionality'},
        {value: '3', title: 'Update account details'},
        {value: '4', title: 'Account closure'},
        {value: '5', title: 'Dormant account'},
        {value: '6', title: 'Deceased account owner'},
        {value: '7', title: 'Accessing e-Statements'},
        {value: '8', title: 'Submitting a support ticket'},
        {value: '9', title: 'Support ticket status'},
        {value: '10', title: 'Other issue'},
      ] 
    },
    { 
      subjectId: '3',
      options: [
        {value: '1', title: 'Fund transfer (incoming)'},
        {value: '2', title: 'Func transfer (Outgoing)'},
        {value: '3', title: 'System errors'},
        {value: '4', title: 'Unavailable payment method'},
        {value: '5', title: 'Failed or unsucessful fund transfer'},
        {value: '6', title: 'Fund transfer not refected'},
        {value: '7', title: 'Other issues'},
      ] 
    },
    { 
      subjectId: '4',
      options: [
        {value: '1', title: 'Compromised account'},
        {value: '2', title: 'Access verification and security'},
        {value: '3', title: 'Other issues'}
      ] 
    },
    { 
      subjectId: '5',
      options: [
        {value: '1', title: 'Disputing a transaction'},
        {value: '2', title: 'Fraudulent transaction'},
        {value: '3', title: 'Other issues'},
      ] 
    },
    { 
      subjectId: '6',
      options: [
        {value: '1', title: 'Change customer details'},
      ] 
    },
    { 
      subjectId: '7',
      options: [
        {value: '1', title: 'Other issues'},
        {value: '2', title: 'Feedback'},
        {value: '3', title: 'Complaint'},
        {value: '4', title: 'Request'},
      ] 
    },
  ];