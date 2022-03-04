import AsyncStorage from '@react-native-async-storage/async-storage';
import { CountryInformation } from '../country-picker/types';

const COUNTRY_KEY = 'themecomponent.countries';
const CURRENCY_KEY = 'themecomponent.currencies';

class LocalCountry {
  storeCountries = (countries: CountryInformation[]) =>
    AsyncStorage.setItem(COUNTRY_KEY, JSON.stringify(countries));

  getCountries = async (): Promise<CountryInformation[]> => {
    try {
      const value = await AsyncStorage.getItem(COUNTRY_KEY);
      return value ? JSON.parse(value) : [];
    } catch (_) {
      return [];
    }
  };

  storeCurrencies = (currencies: any[]) =>
    AsyncStorage.setItem(CURRENCY_KEY, JSON.stringify(currencies));

  getCurrencies = async (): Promise<any[]> => {
    try {
      const value = await AsyncStorage.getItem(CURRENCY_KEY);
      return value ? JSON.parse(value) : [];
    } catch (_) {
      return [];
    }
  };
}

const instance = new LocalCountry();
export default instance;
