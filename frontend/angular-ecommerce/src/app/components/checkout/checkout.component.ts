import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CartShopService } from 'src/app/services/cart-shop.service';
import { MonthYearCardService } from 'src/app/services/month-year-card.service';
import { CountriesStatesService } from 'src/app/services/countries-states.service';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { Luv2ShopValidators } from 'src/app/validators/luv2-shop-validators';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Router } from '@angular/router';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  totalPrice: number = 0;
  totalQuantity: number = 0;

  checkoutFormGroup : FormGroup;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  //TO GET THE USER'S EMAIL FROM THE BROWSER SESSION (SEE orderHistory SERVICE WHERE WE HAVE ALREADY DIFINED THIS INFORMATION)
  storage: Storage = sessionStorage;

  constructor(private formBuilder : FormBuilder, private cartShopService : CartShopService,
    private monthYearCardService: MonthYearCardService, private countriesStatesService: CountriesStatesService,
    private checkoutService:CheckoutService, private router: Router ) 
     { }

  ngOnInit(): void {
   
    // Get the totalPrice and totalQuantity from the service
    this.cartShopService.totalPrice.subscribe(data => this.totalPrice = data);
    this.cartShopService.totalQuantity.subscribe(data => this.totalQuantity = data);
    this.cartShopService.computeCartTotals();

    //Read the user's email From THE BROWSER STORAGE (SEE 'LOGIN-STATUS-COMPONENT'). 
    //TO PREPOPULATE DYNAMICCLY THE EMAIL FIELD WHEN Checkouting the order
     const theEmailUser = JSON.parse(this.storage.getItem('emailUser'));


    this.checkoutFormGroup = this.formBuilder.group(
      {
        customer:this.formBuilder.group({
          firstName : new FormControl('',
                                     [Validators.required, Validators.minLength(2), 
                                     Luv2ShopValidators.notOnlyWhitespace]),
          lastName : new FormControl('',
                                    [Validators.required, Validators.minLength(2),
                                    Luv2ShopValidators.notOnlyWhitespace]),

          //Le \ DEVANT le \. est Très Important car on cherche n'importe quelle suite de caractères alphanumériques
          //SUIVIE du POINT (D'ou \ devant .) Si on laisse qu'un seul \ Ca ne marche pas car par Exple: as@.commmm (Passe!)!!! 
          email : new FormControl(theEmailUser, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
          
    
        }),
        shippingAddress: this.formBuilder.group({
          street: new FormControl('', [Validators.required, Validators.minLength(2),Luv2ShopValidators.notOnlyWhitespace]),
          city:   new FormControl('', [Validators.required, Validators.minLength(2),Luv2ShopValidators.notOnlyWhitespace]),
          state:  new FormControl('', [Validators.required]),
          country: new FormControl('', [Validators.required]),
          zipCode: new FormControl('', [Validators.required, Validators.minLength(2),Luv2ShopValidators.notOnlyWhitespace])
        }),
        billingAddress: this.formBuilder.group({
          street:   new FormControl('', [Validators.required, Validators.minLength(2),Luv2ShopValidators.notOnlyWhitespace]),
          city:     new FormControl('', [Validators.required, Validators.minLength(2),Luv2ShopValidators.notOnlyWhitespace]),
          state:    new FormControl('', [Validators.required]),
          country:  new FormControl('', [Validators.required]),
          zipCode:  new FormControl('', [Validators.required, Validators.minLength(2),Luv2ShopValidators.notOnlyWhitespace])
        }),
        creditCard: this.formBuilder.group({
          cardType: new FormControl('', [Validators.required]),
          nameOnCard: new FormControl('', [Validators.required,Validators.minLength(2),Luv2ShopValidators.notOnlyWhitespace]),
          cardNumber: new FormControl('', [Validators.required,Validators.pattern('[0-9]{16}')]),
          securityCode: new FormControl('', [Validators.required,Validators.pattern('[0-9]{3}')]),
          expirationMonth: [''],
          expirationYear: ['']
        }),
      });

     // populate credit card months
    const startMonth: number = new Date().getMonth() + 1;
    this.monthYearCardService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    );

    // populate credit card years
    this.monthYearCardService.getCreditCardYears().subscribe(
      data => {
        this.creditCardYears = data;
      }
    );

    //populate countries
    this.countriesStatesService.getCountries().subscribe(
      data => {
        this.countries = data;
      }
    );

  }

 //Get the values of firstName,lastName, email for Validadtions
  get firstName() { return this.checkoutFormGroup.get('customer.firstName');}
  get lastName() { return this.checkoutFormGroup.get('customer.lastName');}
  get email() { return this.checkoutFormGroup.get('customer.email');}

  //Get values of shippingAddress
  get shippingAddressStreet() { return this.checkoutFormGroup.get('shippingAddress.street');}
  get shippingAddressCity() { return this.checkoutFormGroup.get('shippingAddress.city');}
  get shippingAddressState() { return this.checkoutFormGroup.get('shippingAddress.state');}
  get shippingAddressZipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode');}
  get shippingAddressCountry() { return this.checkoutFormGroup.get('shippingAddress.country');}

  //Get values of billingAddress
  get billingAddressStreet() { return this.checkoutFormGroup.get('billingAddress.street');}
  get billingAddressCity() { return this.checkoutFormGroup.get('billingAddress.city');}
  get billingAddressState() { return this.checkoutFormGroup.get('billingAddress.state');}
  get billingAddressZipCode() { return this.checkoutFormGroup.get('billingAddress.zipCode');}
  get billingAddressCountry() { return this.checkoutFormGroup.get('billingAddress.country');}

  //Get values of Credi Card
  get creditCardType() { return this.checkoutFormGroup.get('creditCard.cardType');}
  get creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard');}
  get creditCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber');}
  get creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode');}



  copyShippingAddressToBillingAddress(event) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress
            .setValue(this.checkoutFormGroup.controls.shippingAddress.value);

      // bug fix for states, we must do this affectation!
      this.billingAddressStates = this.shippingAddressStates;

    }
    else {
      this.checkoutFormGroup.controls.billingAddress.reset();

      // bug fix for states
      this.billingAddressStates = [];
    }

  }

  handleMonthsAndYears()
  {
    const yearSelected  = Number(this.checkoutFormGroup.get('creditCard').value.expirationYear);
    let startMonth:number;

    if (yearSelected != new Date().getFullYear())
    {
      startMonth = 1;
    } 
    
    else
    {
      startMonth = new Date().getMonth() + 1;
    }

    this.monthYearCardService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    );

  }

  //populate states corresponding to the selected country
  getStates(formGroupName: String)
  {
    const countrySelected  = this.checkoutFormGroup.get(String(formGroupName)).value.country.code;
    this.countriesStatesService.getStates(countrySelected).subscribe(
      data => {
        if(formGroupName === 'shippingAddress')
          {
            this.shippingAddressStates = data;
          }

        else if(formGroupName === 'billingAddress')
          {
          this.billingAddressStates = data;
        }    
    }

    ); 
  }

  onSubmit()
  {
    console.log("Handling the submit button");

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    //console.log('Email adress is :' + this.checkoutFormGroup.get('customer').value.email);

    //console.log('Aaddress IS :' + this.checkoutFormGroup.get('shippingAddress').value.state);

    // set up order
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    // get cart items
    const cartItems = this.cartShopService.cartItems;

    // create orderItems from cartItems
    // - long way
    /*
    let orderItems: OrderItem[] = [];
    for (let i=0; i < cartItems.length; i++) {
      orderItems[i] = new OrderItem(cartItems[i]);
    }
    */
    // - short way of doing the same thingy
    let orderItems: OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem));


    // set up purchase
    let purchase = new Purchase();
    
    // populate purchase - customer
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;

    
    // populate purchase - shipping address
    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;

    //const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
    const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
    const shippingCountry: Country= JSON.parse(JSON.stringify(purchase.shippingAddress.country));

    purchase.shippingAddress.state = shippingState.name;
    purchase.shippingAddress.country = shippingCountry.name;

    // populate purchase - billing address
    purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
    const billingState: State = JSON.parse(JSON.stringify(purchase.billingAddress.state));
   const billingCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress.country));

    purchase.billingAddress.state = billingState.name;
    purchase.billingAddress.country = billingCountry.name;   

    // populate purchase - order and orderItems
    purchase.order = order;
    purchase.orderItems = orderItems;

    //console.log(JSON.stringify(purchase));

     // call REST API via the CheckoutService
     this.checkoutService.placeOrder(purchase).subscribe({
      next: response => {
        alert(`Your order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`);

        // reset cart
        this.resetCart();

      },
      error: err => {
        alert(`There was an error: ${err.message}`);
      }
    }
  );

  }

  resetCart() {
    // reset cart data
    this.cartShopService.cartItems = [];
    this.cartShopService.totalPrice.next(0);
    this.cartShopService.totalQuantity.next(0);
    
    // reset the form
    this.checkoutFormGroup.reset();

    // navigate back to the products page
    this.router.navigateByUrl("/products");
  }

}
