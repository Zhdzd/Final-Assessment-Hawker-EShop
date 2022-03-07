package com.example.springbootecommerce.repo;

import com.example.springbootecommerce.models.Customer;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long>{

    Customer findByEmail(String custEmail);
    
}
