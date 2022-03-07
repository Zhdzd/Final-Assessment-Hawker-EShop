package com.example.springbootecommerce.DataTransfer;

import java.util.Set;

import com.example.springbootecommerce.models.Address;
import com.example.springbootecommerce.models.Customer;
import com.example.springbootecommerce.models.Order;
import com.example.springbootecommerce.models.OrderItem;

public class Purchase {

    private Customer customer;

    private Address deliveryAddress;

    private Address billingAddress;

    private Order order;

    private Set<OrderItem> orderItems;
    


    public Customer getCustomer() {
        return customer;
    }


    public void setCustomer(Customer customer) {
        this.customer = customer;
    }


    public Address getDeliveryAddress() {
        return deliveryAddress;
    }


    public void setDeliveryAddress(Address deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }


    public Order getOrder() {
        return order;
    }


    public void setOrder(Order order) {
        this.order = order;
    }

 
    public Set<OrderItem> getOrderItems() {
        return orderItems;
    }

   
    public void setOrderItems(Set<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }


    public Address getBillingAddress() {
        return billingAddress;
    }


    public void setBillingAddress(Address billingAddress) {
        this.billingAddress = billingAddress;
    }

}
