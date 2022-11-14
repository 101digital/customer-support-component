import * as Yup from 'yup';

export class CustomerSupportData {
  constructor(
    readonly fullName: string, 
    readonly email: string,
    readonly userPhone: string,
    readonly details: string,
    readonly mainConcern: string,
    readonly subConcern: string,
    ) {}

  static empty(): CustomerSupportData {
    return new CustomerSupportData('','','','', '', '');
  }
}
export const CustomerSupportSchema = Yup.object().shape({
  fullName: Yup.string()
    .trim()
    .required('Please enter your full name'),
  email: Yup.string()
  .trim()
  .email('Invalid email pattern')
  .required('Please enter your email'),
  userPhone: Yup.string()
  .trim()
  .test('len', 'Please enter your phone number', (val: any) => val.length > 5),
  details: Yup.string()
  .trim()
  .required('Please enter details'),
  mainConcern: Yup.string()
  .trim()
  .required('Please select category'),
  subConcern: Yup.string()
  .trim()
  .required('Please select sub concern'),
});
