package com.touilicode.ecommerce.controller;

import com.touilicode.ecommerce.dto.Purchase;
import com.touilicode.ecommerce.dto.PurchaseResponse;
import com.touilicode.ecommerce.service.CheckoutService;
import org.springframework.web.bind.annotation.*;

//NOW, WE DON'T NEED TO DECLARE '@CrossOrigin' BECAUSE WE DEFINED/CONFIGURATED IT IN THE 'MyAppConfig' class (config directory)
//@CrossOrigin("http://localhost:4200")

@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    private CheckoutService checkoutService;

    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase) {

        PurchaseResponse purchaseResponse = checkoutService.placeOrder(purchase);

        return purchaseResponse;
    }

}









