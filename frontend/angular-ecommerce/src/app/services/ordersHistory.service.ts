import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdersHistoryService {

  //Search Orders By Customer-Email and paginate them
  private baseUrlSearchOrdersByCustomerEmail = 'http://localhost:8080/api/orders/search/findByCustomerEmailOrderByDateCreatedDesc';
  constructor(private httpClient: HttpClient) { }

    private getOrders(searchUrl: string): Observable<any[]> {
      return this.httpClient.get<GetResponseOrders>(searchUrl).pipe(map(response => response._embedded.orders));
    }

    //Get orders of a given Customer (a given Customer email)
    searchOrdersByEmail(email: string) {

    const searchUrl = `${this.baseUrlSearchOrdersByCustomerEmail}?email=${email}`;
    // WE CAN ALSO DECLARE/DEFINE THE 'searchUrl' varibale LIKE THAT:
    //const searchUrl = this.baseUrlSearchOrdersByCustomerEmail+"?email=${email}";
    return this.getOrders(searchUrl);
  }

}

//Start of IINTERFACES
interface GetResponseOrders {
  _embedded: {
    orders: any[];
  }
}
