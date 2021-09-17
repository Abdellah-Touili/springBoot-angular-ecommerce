import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/common/category';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[];
  

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listCategories();
    }

    );
  }

  listCategories() {

    this.productService.getCategoryList().subscribe(
      data => {
       // console.log('Product Categories:'+ JSON.stringify(data));
        this.categories = data;
      }
    )
  }

}
