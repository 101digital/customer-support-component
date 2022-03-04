import React, { useEffect } from 'react';
import { useMemo, useState } from 'react';
import { ErrorModalStyles } from '../error-modal';
import defaultErrorModalTheme from '../error-modal/theme';
import { AlertModalStyles } from '../alert';
import defaultAlertTheme from '../alert/theme';
import { BottomSheetModalStyles } from '../bottom-sheet';
import defaultBottomSheetTheme from '../bottom-sheet/theme';
import { ButtonStyles } from '../button';
import defaultButtonTheme from '../button/theme';
import { defaultColors, ThemeColorProps } from '../colors';
import { defaultFont, ThemeFontProps } from '../fonts';
import { InputFieldStyles } from '../input-field';
import defaultInputFieldTheme from '../input-field/theme';
import { InputPhoneNumberStyles } from '../input-phone-number';
import defaultInputPhoneNumberTheme from '../input-phone-number/theme';
import { CountryInformation } from '../country-picker/types';
import { localCountry, countryServices } from '../services';
import { getDeviceCountryCode } from '../country-picker/country-code';
import { filter, find, isEmpty } from 'lodash';
import { CountryPickerStyles } from '../country-picker';
import defaultCountryPickerTheme from '../country-picker/theme';
import { DatePickerStyles } from '../date-picker';
import defaultDatePickerTheme from '../date-picker/theme';
import { ImagePickerStyles } from '../image-picker';
import defaultImagePickerTheme from '../image-picker/theme';
import { DateRangePickerStyles } from '../date-range-picker';
import defaultDateRangePickerTheme from '../date-range-picker/theme';
import { CheckBoxStyles } from '../checkbox';
import defaultCheckBoxTheme from '../checkbox/theme';
import { LoadingModalStyles } from '../loading-modal';
import defaultLoadingModalStyles from '../loading-modal/theme';

export const defaultTheme = (fonts: ThemeFontProps, colors: ThemeColorProps): ThemeProps => {
  return {
    colors: defaultColors,
    button: defaultButtonTheme(fonts, colors),
    alert: defaultAlertTheme(fonts, colors),
    fonts: defaultFont,
    bottomSheet: defaultBottomSheetTheme,
    inputField: defaultInputFieldTheme(fonts, colors),
    inputPhoneNumber: defaultInputPhoneNumberTheme(fonts, colors),
    errorModal: defaultErrorModalTheme(fonts),
    countryPicker: defaultCountryPickerTheme(fonts),
    datePicker: defaultDatePickerTheme(fonts, colors),
    imagePicker: defaultImagePickerTheme(fonts),
    dateRangePicker: defaultDateRangePickerTheme(fonts, colors),
    checkBox: defaultCheckBoxTheme(fonts, colors),
    loadingModal: defaultLoadingModalStyles(),
  };
};

export type ThemeProps = {
  colors: ThemeColorProps;
  button: ButtonStyles;
  fonts: ThemeFontProps;
  alert: AlertModalStyles;
  bottomSheet: BottomSheetModalStyles;
  inputField: InputFieldStyles;
  inputPhoneNumber: InputPhoneNumberStyles;
  errorModal: ErrorModalStyles;
  countryPicker: CountryPickerStyles;
  datePicker: DatePickerStyles;
  imagePicker: ImagePickerStyles;
  dateRangePicker: DateRangePickerStyles;
  checkBox: CheckBoxStyles;
  loadingModal: LoadingModalStyles;
};

export interface ThemeContextData {
  colors: ThemeColorProps;
  button: ButtonStyles;
  fonts: ThemeFontProps;
  alert: AlertModalStyles;
  bottomSheet: BottomSheetModalStyles;
  inputField: InputFieldStyles;
  inputPhoneNumber: InputPhoneNumberStyles;
  errorModal: ErrorModalStyles;
  countryPicker: CountryPickerStyles;
  datePicker: DatePickerStyles;
  imagePicker: ImagePickerStyles;
  dateRangePicker: DateRangePickerStyles;
  checkBox: CheckBoxStyles;
  loadingModal: LoadingModalStyles;
  i18n?: any;
  countries: CountryInformation[];
  deviceCountryCode: string;
  isLoadingCountry: boolean;
  currencies: any[];
}

export const themeDefaultValue: ThemeContextData = {
  colors: {},
  button: {},
  fonts: {},
  alert: {},
  bottomSheet: {},
  inputField: {},
  errorModal: {},
  inputPhoneNumber: {},
  countryPicker: {},
  datePicker: {},
  imagePicker: {},
  dateRangePicker: {},
  checkBox: {},
  countries: [],
  deviceCountryCode: '65',
  isLoadingCountry: false,
  currencies: [],
  loadingModal: {},
};

export const ThemeContext = React.createContext<ThemeContextData>(themeDefaultValue);

export const useThemeContextValue = (initial: ThemeProps, initI18n?: any): ThemeContextData => {
  const [colors] = useState<ThemeColorProps>(initial.colors ?? {});
  const [fonts] = useState<ThemeFontProps>(initial.fonts ?? {});
  const [button] = useState<ButtonStyles>(initial.button ?? {});
  const [alert] = useState<AlertModalStyles>(initial.alert ?? {});
  const [bottomSheet] = useState<BottomSheetModalStyles>(initial.bottomSheet ?? {});
  const [inputField] = useState<InputFieldStyles>(initial.inputField ?? {});
  const [inputPhoneNumber] = useState<InputPhoneNumberStyles>(initial.inputPhoneNumber ?? {});
  const [errorModal] = useState<ErrorModalStyles>(initial.errorModal ?? {});
  const [countryPicker] = useState<CountryPickerStyles>(initial.countryPicker ?? {});
  const [i18n] = useState<any>(initI18n);
  const [countries, setCountries] = useState<CountryInformation[]>([]);
  const [deviceCountryCode, setDeviceCountryCode] = useState<string>('65');
  const [isLoadingCountry, setLoadingCountry] = useState(false);
  const [datePicker] = useState<DatePickerStyles>(initial.datePicker ?? {});
  const [imagePicker] = useState<ImagePickerStyles>(initial.imagePicker ?? {});
  const [dateRangePicker] = useState<DateRangePickerStyles>(initial.dateRangePicker ?? {});
  const [currencies, setCurrencies] = useState<any[]>([]);
  const [checkBox] = useState<CheckBoxStyles>(initial.checkBox ?? {});
  const [loadingModal] = useState<LoadingModalStyles>(initial.loadingModal ?? {});

  useEffect(() => {
    getCurrentCountries();
    getCurrencies();
  }, []);

  useEffect(() => {
    getCountryCode();
  }, [countries]);

  const getCurrencies = async () => {
    try {
      const _localCurrencies = await localCountry.getCurrencies();
      if (_localCurrencies.length === 0) {
        const _currencies = await countryServices.getCurrencies();
        await localCountry.storeCurrencies(_currencies);
        setCurrencies(_currencies);
      } else {
        setCurrencies(_localCurrencies);
      }
    } catch (error) {
      setCurrencies([]);
    }
  };

  const getCurrentCountries = async () => {
    try {
      setLoadingCountry(true);
      const _localCountries = await localCountry.getCountries();
      if (_localCountries.length === 0) {
        const _countries = await countryServices.getCountries();
        const filteredCountried = filter(
          _countries,
          (country) => !isEmpty(country.attributes.idd) && country.attributes.idd !== 'NONE'
        );
        let lastestCountries: CountryInformation[] = [];
        filteredCountried.forEach((country: CountryInformation) => {
          const separateIdds = country.attributes.idd.split(',');
          if (separateIdds.length > 0) {
            separateIdds.forEach((idd) =>
              lastestCountries.push({
                ...country,
                attributes: {
                  ...country.attributes,
                  idd: idd.trim().replace('+', ''),
                },
              })
            );
          } else {
            lastestCountries.push({
              ...country,
              attributes: { ...country.attributes, idd: country.attributes.idd.replace('+', '') },
            });
          }
        });
        await localCountry.storeCountries(lastestCountries);
        setCountries(lastestCountries);
      } else {
        setCountries(_localCountries);
      }
      setLoadingCountry(false);
    } catch (error) {
      setCountries([]);
      setLoadingCountry(false);
    }
  };

  const getCountryCode = async () => {
    const _countryCode = await getDeviceCountryCode();
    if (!isEmpty(countries) && _countryCode) {
      const data = find(countries, (c) => c.attributes.code2 === _countryCode);
      if (data) {
        setDeviceCountryCode(data.attributes.idd);
      }
    }
  };

  return useMemo(
    () => ({
      colors,
      fonts,
      button,
      alert,
      bottomSheet,
      inputField,
      inputPhoneNumber,
      i18n,
      errorModal,
      countries,
      deviceCountryCode,
      countryPicker,
      isLoadingCountry,
      datePicker,
      imagePicker,
      dateRangePicker,
      currencies,
      checkBox,
      loadingModal,
    }),
    [
      colors,
      fonts,
      button,
      alert,
      bottomSheet,
      inputField,
      inputPhoneNumber,
      i18n,
      errorModal,
      countries,
      deviceCountryCode,
      countryPicker,
      isLoadingCountry,
      datePicker,
      imagePicker,
      dateRangePicker,
      currencies,
      checkBox,
      loadingModal,
    ]
  );
};
