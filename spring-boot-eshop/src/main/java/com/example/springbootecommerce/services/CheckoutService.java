package com.example.springbootecommerce.services;

import com.example.springbootecommerce.DataTransfer.Purchase;
import com.example.springbootecommerce.DataTransfer.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase Purchase);
    
}
