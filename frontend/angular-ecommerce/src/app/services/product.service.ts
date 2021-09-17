import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from '../common/product';
import { Category } from '../common/category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrlProduct = 'http://localhost:8080/api/products';
  private baseUrlCategory = 'http://localhost:8080/api/product-category';
  private baseUrlSearch = 'http://localhost:8080/api/products/search/findByNameContaining';
  //Serach Products by KeyWord and paginate them by category
  private baseUrlSearchKeyWordAndCategory = 'http://localhost:8080/api/products/search/findProductByKeyWordAndCategoryId';


  constructor(private httpClient: HttpClient) { }

  //This Method was Build by Refractoring repetitive code in : getProducts() and searchProductsByName())
  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(map(response => response._embedded.products));
  }

  //Get All Products
  getProductListPaginate(thePage:number, thePageSize: number, theCategoryId: number): Observable<GetResponseProduct> {
    // need to build URL based on category id, page and size (these 2 last parameters are for the pagination)
    const searchUrl = `${this.baseUrlProduct}/search/findByCategoryId?id=${theCategoryId}&page=${thePage}&size=${thePageSize}`;
    
    //return this.getProducts(searchUrl);

    //?????????????????????????????????????
    return this.httpClient.get<GetResponseProduct>(searchUrl);   
  }

  //Get Products corresponding to the given category (id), by default it give products corresponding to the first category
  getProductList(theCategoryId: number): Observable<Product[]> {
    // need to build URL based on category id 
    const searchUrl = `${this.baseUrlProduct}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(searchUrl);
  }

  //Get a Product by ID
  getProductById(Id: number): Observable<Product> {
    //To build URL based on product_id 
    const productUrl = `${this.baseUrlProduct}/${Id}`;
    //Return a simple Object : Product, Not an Array
    return this.httpClient.get<Product>(productUrl);
  }

  //Get the products searched by Name of product
  searchProductsByName(keyWord: string) {
    const searchUrl = `${this.baseUrlSearch}?name=${keyWord}`;
    return this.getProducts(searchUrl);
  }

//Get the products searched by Name of product
searchProductsByNameAndCategory(keyWord: string, categoryId:number) {
  const searchUrl = `${this.baseUrlSearchKeyWordAndCategory}?name=${keyWord}&idCategory=${categoryId}`;
  return this.getProducts(searchUrl);
}


//Get the products searched by Name of product and Pagination
  searchProductsByNamePaginate(keyWord: string, thePage:number, thePageSize: number):Observable<GetResponseProduct>{
    const searchUrl = `${this.baseUrlSearch}?name=${keyWord}&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProduct>(searchUrl);   
  }

  //Get The categories (The name of Them!) 
  getCategoryList(): Observable<Category[]> {

    // need to build URL based on category id 
    //const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.httpClient.get<GetResponseCategory>(this.baseUrlCategory).pipe(
      map(response => response._embedded.productCategory)
    );
  }


  //To display the Name of he Category for a given CategoryId (For the Products Grid): IT was My Solution
  /*  getCategoryByName(idCategory:number): Observable<Category[]> {
 
     // need to build URL based on category id 
     const searchUrl = `${this.baseUrlCategory}/search/findById?id=${idCategory}`;
 
     return this.httpClient.get<GetResponseCategory>(searchUrl).pipe(
       map(response => response._embedded.productCategory)
     );
   } */

}
//END of the CLASS

//Start of IINTERFACES
interface GetResponseProduct {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseCategory {
  _embedded: {
    productCategory: Category[];
  }
}

