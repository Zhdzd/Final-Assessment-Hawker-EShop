package com.example.springbootecommerce.services;

import java.util.Set;
import java.util.UUID;

import javax.transaction.Transactional;

import com.example.springbootecommerce.DataTransfer.Purchase;
import com.example.springbootecommerce.DataTransfer.PurchaseResponse;
import com.example.springbootecommerce.models.Customer;
import com.example.springbootecommerce.models.Order;
import com.example.springbootecommerce.models.OrderItem;
import com.example.springbootecommerce.repo.CustomerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    private CustomerRepository customerRepository;

    @Autowired
    public CheckoutServiceImpl(CustomerRepository customerRepository){
            this.customerRepository = customerRepository;
    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
      
       //retrieve order info from data transfer
       Order order = purchase.getOrder();

       //generate tracking number
        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);

        //order items
        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(item -> order.add(item));

        
       //popualte order with billing add and delivery add
       order.setBillingAddress(purchase.getBillingAddress());
       order.setDeliveryAddress(purchase.getDeliveryAddress());


       //populate customer with order
       Customer customer = purchase.getCustomer();

       //to check for existing cust
        String custEmail = customer.getEmail();
        Customer customerDB = customerRepository.findByEmail(custEmail);
        if(customerDB != null){
            customer = customerDB;
        }

       //push to database
       customer.add(order);
    
       //save to database
       customerRepository.save(customer);

       //return response
       return new PurchaseResponse(orderTrackingNumber);
    }

    private String generateOrderTrackingNumber() {
        //use uuid to generate track number
        return UUID.randomUUID().toString();
    }
    
}
