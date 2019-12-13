import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CustomerService {

  server_name = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCustomerById(uID) {
    return this.http.get(this.server_name + `/customer/${uID}`);
  }

  getAllUsers() {
     return this.http.get(this.server_name + '/getAllUsers');
  }

  addCustomer(body) {
    return this.http.post(this.server_name + '/addCustomer', body);
  }

  deleteCustomer(uID) {
    return this.http.delete(this.server_name + `/customer/remove/${uID}`);
  }

}

