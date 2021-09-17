import { Component, OnInit } from '@angular/core';
import { OrdersHistoryService } from 'src/app/services/ordersHistory.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: any[];

  //TO GET THE USER'S EMAIL FROM THE BROWSER SESSION (SEE orderHistory SERVICE WHERE WE HAVE ALREADY DIFINED THIS INFORMATION)
  storage: Storage = sessionStorage;

  constructor(private ordersHistoryService:OrdersHistoryService) { }

  ngOnInit(): void {
    this.getOrdersByCustomerEmail();
  }

  getOrdersByCustomerEmail(){

    //Read the user's email From THE BROWSER STORAGE (SEE 'LOGIN-STATUS-COMPONENT')
    const theEmailUser = JSON.parse(this.storage.getItem('emailUser'));
    
    //RETRIVE DATA FROM THE SERVICE
    //this.orderService.searchOrdersByEmail(emailCustomer).subscribe(this.processResult());

    // !!!!!!!!!!!!!!!!!!!!!!! OU MIEUX ENCORE, ET PLUS SIMPLE QUE CI DESSUS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    this.ordersHistoryService.searchOrdersByEmail(theEmailUser).subscribe(data => this.orders=data);

    //console.log("le client est :" + JSON.stringify(this.customers));

    //console.log("le client est :" + JSON.stringify(this.customers));
  }

  /*
  processResult() {
    return data => {
      this.orders = data._embedded.orders;    
    };
  }
  */
  
}
