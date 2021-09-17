import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
//import {CartService} from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';
import { CartShopService } from 'src/app/services/cart-shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId: number;

  //VERY IMPORTANT TO INSTANCIATE AN AOBJET = GIVE IT A VALUE EMPTY! (TO AVOID NOT NULL OR UNDEFINED)*** If not we will have Errors. Like for example : 
  // canNOt access the property "product.imageUrl" in the Html File (AS Image take Time to be loaded from the server. DATA BINDING IN ANGULAR)
  product: Product = new Product();
  cartItem: CartItem;
  
  constructor(private productService: ProductService, private cartShopService: CartShopService, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProduct();

    //********************   WHY ID DOESN T WORK WHEN THIS METHOD WAS CALLED OnInit()??????????? */
    // this.addToCart(this.product);
  }
  getProduct() {
    this.productId = +this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(this.productId).subscribe(
      data => { this.product = data; }
    )
  }

  //It was for my Solution 
  /*  addToCart(thePrice:number){  
     this.cartService.totalPriceCart  =this.cartService.totalPriceCart+thePrice;
     this.cartService.nbrproductsCart =this.cartService.nbrproductsCart +1;
   } */

  addToCart() {
    //This Below was used by my Solution to transfer TotalPrice and TotalQuantity (nbr quantity) VIA CART SERVICE (AND NOT CARTSHOP SERVICE)
    //It is a simple and easy way to tranfer data between components (Not betwwen parent and child) via get dat() (Exple: get TotalPrice()) and (SET for setter)

    /* this.cartService.totalPriceCart  =this.cartService.totalPriceCart  + theProduct.unitPrice;
    this.cartService.nbrproductsCart =this.cartService.nbrproductsCart +1; */

    //We Set our ItemProduct to the purchased product and call the service 
    this.cartItem = new CartItem(this.product);
    this.cartShopService.addToCart(this.cartItem);

  }
}
