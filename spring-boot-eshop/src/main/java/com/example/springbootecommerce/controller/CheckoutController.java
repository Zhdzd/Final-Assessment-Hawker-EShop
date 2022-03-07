package com.example.springbootecommerce.controller;

import com.example.springbootecommerce.DataTransfer.Purchase;
import com.example.springbootecommerce.DataTransfer.PurchaseResponse;
import com.example.springbootecommerce.services.CheckoutService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    private CheckoutService checkoutSvc;

    @Autowired
    public CheckoutController(CheckoutService checkoutSvc){
        this.checkoutSvc = checkoutSvc;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase){
        
        PurchaseResponse purchaseResponse = checkoutSvc.placeOrder(purchase);

        return purchaseResponse;
    }

    
}
