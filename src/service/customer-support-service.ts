import { CustomerParam } from '../types';

type CustomerSupportClient = {
  contactBaseUrl: string;
};

export class CustomerSupportService {
  private static _instance: CustomerSupportService = new CustomerSupportService();

  private _client?: CustomerSupportClient;

  constructor() {
    if (CustomerSupportService._instance) {
      throw new Error(
        'Error: Instantiation failed: Use CustomerSupportService.instance() instead of new.'
      );
    }
    CustomerSupportService._instance = this;
  }

  public static instance(): CustomerSupportService {
    return CustomerSupportService._instance;
  }

  public initClients = (client: CustomerSupportClient) => {
    this._client = client;
  };

  public contactBaseUrl = (params: CustomerParam) => {
    if (this._client) {
      return `${this._client.contactBaseUrl}?${Object.entries(params)
        .map((obj) => `${obj[0]}=${obj[1]}`)
        .join('&')}`;
    } else {
      return 'http://';
    }
  };
}
