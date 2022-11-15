import * as Yup from 'yup';
import { i18n } from '@/translations/translation-config';

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
    .required(`${i18n.t("customer_support.lbl_error_enter_full_name")}`),
  email: Yup.string()
  .trim()
  .email(`${i18n.t("customer_support.lbl_error_email_format")}`)
  .required(`${i18n.t("customer_support.lbl_error_email")}`),
  userPhone: Yup.string()
  .trim()
  .test('len', `${i18n.t("customer_support.lbl_error_phone")}`, (val: any) => val.length > 5),
  details: Yup.string()
  .trim()
  .required(`${i18n.t("customer_support.lbl_error_details")}`),
  mainConcern: Yup.string()
  .trim()
  .required(`${i18n.t("customer_support.lbl_error_category")}`),
  subConcern: Yup.string()
  .trim()
  .required(`${i18n.t("customer_support.lbl_error_sub_concern")}`),
});
