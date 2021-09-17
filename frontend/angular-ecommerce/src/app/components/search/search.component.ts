import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  onSubmit(form: NgForm) {
    const keyWordSearch = form.value['search'];

    //This a Way to NAVIGATE/ROUTE
    //this.router.navigate(['/search', keyWordSearch]);
    //****************!!!!!!!!!!!!!!!!!!!ANOTHER WAY to NAVIGATE  BUT WITHINVERTED APOSTROPH********************!!!!!!!!!!!!!!!!
    this.router.navigateByUrl(`/search/${keyWordSearch}`);

  }

}
