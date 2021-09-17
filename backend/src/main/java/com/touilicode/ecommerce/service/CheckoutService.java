package com.touilicode.ecommerce.service;

import com.touilicode.ecommerce.dto.Purchase;
import com.touilicode.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
