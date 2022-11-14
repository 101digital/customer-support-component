import { ClientData, CustomerParam } from '../types';

type CustomerSupportClient = {
  customerSupportClient: any;
  contactBaseUrl: string;
};

export class CustomerSupportService {
  private static _instance: CustomerSupportService = new CustomerSupportService();

  private _customerSupportclient?: any;

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
    this._customerSupportclient = client.customerSupportClient;
  };

  public submitRequest = async (data: FormData) => {
    if (this._customerSupportclient) {
      try{
      console.log('api request -> data ', {
        data,
        headers: { "Content-Type": "multipart/form-data" },
      });
      const response = await this._customerSupportclient.post('requests', data);
      console.log('api request response ', response.data);
      return response.data;
      } catch(error) {
        console.log('error', error);
        console.log('message -> request',error?.request);
        console.log('message',error?.response?.data?.errors[0]);
      }
    } else {
      console.log('Customer service is not exists');
    }
  }
}
