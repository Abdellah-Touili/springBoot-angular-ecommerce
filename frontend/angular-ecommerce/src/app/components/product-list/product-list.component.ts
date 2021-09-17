import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';

import { CartItem } from 'src/app/common/cart-item';
import { Subscription } from 'rxjs';
import { CartShopService } from 'src/app/services/cart-shop.service';

// IT Was USED for My SOLUTION to display Categry Name above the list of the corresponding products
//import { Category } from 'src/app/common/category';

@Component({
  selector: 'app-product-list',
  // templateUrl: './product-list-table.component.html',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  //For displaying The name Categories on the Left Menu
  currentCategoryId: number = 1;
  //For Handling Pagination
  previousCategoryId: number = 1;
  //For displaying The name of the Category corresponding to the Products Listing
  currentCategoryName: string = "";
  //For seraching a Product By Name
  //searchWord: string ="";
  // IT Was USED for My SOLUTION to display Categry Name above the list of the corresponding products (My Solution)
  //categories:Category[];

  searchMode: boolean = false;

  //New properties for the pagination
  thePageSize: number = 10; //By Default in the Html file, select option
  thePageNumber: number = 1;
  theTotalElements: number = 0;
  //To assign the value 1 to the thePageNumber if the searchword change
  previousSearchWord: string;

  //It was used by my Solution: Easy tranfer th data via the CartService
  /* // To have the price total of the cart
    theTotalCart:number=0; */

  //For passing the shipped product to the addcart method in the cart service 
  cartItem: CartItem;

  totalPriceProduct:number =0.00;
  totalQuantityProduct:number =0;

  constructor(private productService: ProductService, private cartShopService: CartShopService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });

  }

  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }

  }

  handleListProducts() {

    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
      // OR : this.currentCategoryId = Number(this.route.snapshot.paramMap.get('id'));

      // get the "name" param string IT USED TO BE Able to DISPLAY the Category Name of the corresponding products
      this.currentCategoryName = this.route.snapshot.paramMap.get('name');
    }
    else {
      // not category id available ... default to category id 1
      this.currentCategoryId = 1;
      // to DISPLAY the Category Name by Default 'Books'
      this.currentCategoryName = 'Books';
    }
    //
    // Check if we have a different category than previous
    // Note: Angular will reuse a component if it is currently being viewed
    // if we have a different category id than previous
    // then set thePageNumber back to 1
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;
    // now get the products for the given PageNumber, PageSize, Category id
    this.productService.getProductListPaginate(this.thePageNumber - 1, this.thePageSize, this.currentCategoryId)
      .subscribe(this.processResult());

    // console.log('the products are: ' + JSON.stringify(this.products));
  }

  /*  This Method was Used before Using PAGINATION, the display Products
  listProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
      // OR : this.currentCategoryId = Number(this.route.snapshot.paramMap.get('id'));

      // get the "name" param string IT USED TO BE Able to DISPLAY the Category Name of the corresponding products
      this.currentCategoryName = this.route.snapshot.paramMap.get('name');
    }
    else {
      // not category id available ... default to category id 1
      this.currentCategoryId = 1;
      // to DISPLAY the Category Name by Default 'Books'
      this.currentCategoryName = 'Books';
    }
    // now get the products for the given category id
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  } */

  handleSearchProducts() {
    /* 
        const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    
         if (hasCategoryId) {
          // get the "id" param string. convert string to a number using the "+" symbol
          this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
         // OR : this.currentCategoryId = Number(this.route.snapshot.paramMap.get('id'));
      
          // get the "name" param string IT USED TO BE Able to DISPLAY the Category Name of the corresponding products
          this.currentCategoryName = this.route.snapshot.paramMap.get('name');
        } 
        else {
          // not category id available ... default to category id 1
          this.currentCategoryId = 1;
         // to DISPLAY the Category Name by Default 'Books'
          this.currentCategoryName = 'Books';
        } */

    const searchWord: string = this.route.snapshot.paramMap.get('keyword');

    /* this.productService.searchProductsByName(this.searchWord).subscribe(
      data => { this.products = data; }
    ) */

    //For the Pagination we use this method, instead of the one above

    if (this.previousSearchWord != searchWord) {
      this.thePageNumber = 1;
    }

    this.previousSearchWord = searchWord;

    // console.log(`the searchWord is: ${searchWord}, thePageNumber is: ${this.thePageNumber}`);

    this.productService.searchProductsByNamePaginate(searchWord, this.thePageNumber - 1, this.thePageSize).subscribe(this.processResult());

  }

  // ******************* IT Was USED for My SOLUTION to display Categry Name above the list of the corresponding products

  // //To display the Name of he Category for a given CategoryId
  // CategoryById()
  // {
  //   this.productService.getCategoryByName(this.currentCategoryId).subscribe(
  //     data => {
  //     //console.log('The Category is:'+ JSON.stringify(data));
  //       this.categories = data;
  //     }
  //   )
  // }


  //***********************    A FAIRE   : FILTRER LES PRODUITS PAR MOT CLE ET CATEGORY NAME/iD */
  //********************************************************************************************* */

  handleSearchProductsByKeyWordAndCategory() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('category');

    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('category');
      // OR : this.currentCategoryId = Number(this.route.snapshot.paramMap.get('id'));

      // get the "name" param string IT USED TO BE Able to DISPLAY the Category Name of the corresponding products
      //this.currentCategoryName = this.route.snapshot.paramMap.get('name');
    }
    else {
      // not category id available ... default to category id 1
      this.currentCategoryId = 1;
      // to DISPLAY the Category Name by Default 'Books'
      //this.currentCategoryName = 'Books';
    }

    const searchWord: string = this.route.snapshot.paramMap.get('keyword');

    //this.productService.searchProductsByNamePaginate(searchWord, this.thePageNumber - 1, this.thePageSize).subscribe(this.processResult());

    this.productService.searchProductsByNameAndCategory(searchWord, this.currentCategoryId).subscribe(this.processResult());
  }


  processResult() {
    return data => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  updatePageSize(pageSize: number) {
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  addToCart(theProduct: Product) {

    //This Below Code was used by my Solution to transfer TotalPrice and TotalQuantity (nbr quantity) VIA CART SERVICE (AND NOT CARTSHOP SERVICE)
    //It is a simple and easy way to tranfer data between components (Not betwwen parent and child) via get dat() (Exple: get TotalPrice()) and (SET for setter)
   
    /* this.cartService.totalPriceCart  =this.cartService.totalPriceCart  + theProduct.unitPrice;
    this.cartService.nbrproductsCart =this.cartService.nbrproductsCart +1; */

    //We add the product to the purchased products List  
    this.cartItem = new CartItem(theProduct);
    this.cartShopService.addToCart(this.cartItem);

  }

}
