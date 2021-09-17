import { Component, OnInit } from '@angular/core';
import { CartShopService } from 'src/app/services/cart-shop.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  constructor(private cartShopService:CartShopService) { }

  ngOnChanges()
  {
    console.log("Price  OnChange  now est "+ this.totalQuantity); 
  }

  ngOnInit(): void {
    this.updateCartStatus();  
    
    
  }


  //IT was my Solution.....But It doesn't dispaly the quantity, subTotal of each purchased Product 
/* //To have the price total from the CartService  
get totalPriceCart ():number
{
  return this.cartService.totalPriceCart ;
}

//To have the number total of the products bought, from the CartService  
get nbrproductsCart():number
{
  return this.cartService.nbrproductsCart;
} */

updateCartStatus() {

  // subscribe to the cart totalPrice
  this.cartShopService.totalPrice.subscribe(  
      data => 
      this.totalPrice = data    
  );

  

  // subscribe to the cart totalQuantity
  this.cartShopService.totalQuantity.subscribe(
    data => this.totalQuantity = data
  );
   
  
 // console.log(`Ici marche: ${this.totalQuantity}`);
} 

}
