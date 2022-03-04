import * as RNLocalize from 'react-native-localize';
import { NativeModules, Platform } from 'react-native';

export const getDeviceCountryCode = async (): Promise<string> => {
  let _code: string;
  if (Platform.OS === 'android') {
    _code = await NativeModules.CountryCodeModule.getDeviceCountryCode();
  } else {
    _code = RNLocalize.getCountry();
  }
  return _code;
};
