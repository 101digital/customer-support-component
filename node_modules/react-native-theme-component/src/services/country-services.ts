const _baseCountryUrl = 'https://api.101digital.io/country-information-service/1.0.0';

class CountryServices {
  getCountries = async () => {
    const response = await fetch(`${_baseCountryUrl}/countries?pageNum=1&pageSize=500`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    return json.data;
  };

  getCurrencies = async () => {
    const response = await fetch(`${_baseCountryUrl}/currencies`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    return json.data;
  };
}

const instance = new CountryServices();
export default instance;
