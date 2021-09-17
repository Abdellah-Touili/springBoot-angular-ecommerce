import { Component, OnInit } from '@angular/core';
import { CartShopService } from 'src/app/services/cart-shop.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartShopService: CartShopService) { }

  ngOnInit(): void {

    this.cartDetails();
  }

  cartDetails() {
    // get a handle to the cart items
    this.cartItems = this.cartShopService.cartItems;

    this.cartShopService.totalPrice.subscribe(data => this.totalPrice = data);
    this.cartShopService.totalQuantity.subscribe(data => this.totalQuantity = data);

   // console.log(`total: ${this.totalPrice} Quantity: ${this.totalQuantity}`);

    // compute cart total price and quantity
    this.cartShopService.computeCartTotals();

    //console.log(`Et maintenant total: ${this.totalPrice} Et maintenant Quantity: ${this.totalQuantity}`);
  }

  incrementQuantity(theCartItem : CartItem)
  {
    /* cartItem.quantity++;
    this.cartShopService.computeCartTotals(); */

    //IT S BETTER TO Use this WAY : ADD THE CART-ITEM TO THE ARRAY OF CARTITEM, in order to have the totalPrice, totalQuantity UPDATED 
    // Automaticlly
    this.cartShopService.addToCart(theCartItem);
  }

  decrementQuantity(theCartItem : CartItem)
  {
    this.cartShopService.decrementQuantity(theCartItem);
  }  

  remove(theCartItem: CartItem) {
    this.cartShopService.remove(theCartItem);
  }
}
