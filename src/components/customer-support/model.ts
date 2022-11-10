import * as Yup from 'yup';
import { i18n } from '@/translations/translation-config';

export class CustomerSupportData {
  constructor(readonly username: string) {}

  static empty(): CustomerSupportData {
    return new CustomerSupportData('');
  }
}
export const CustomerSupportSchema = Yup.object().shape({
  username: Yup.string()
    .trim()
    .required(i18n.t('user_registration.val_enter_mobile_number'))
    .min(8, i18n.t('user_registration.val_enter_valid_mobile_number'))
    .max(15, i18n.t('user_registration.val_enter_valid_mobile_number')),
});
