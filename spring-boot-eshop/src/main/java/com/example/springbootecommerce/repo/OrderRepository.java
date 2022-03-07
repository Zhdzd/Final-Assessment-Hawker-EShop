package com.example.springbootecommerce.repo;

import com.example.springbootecommerce.models.Order;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@RepositoryRestResource
public interface OrderRepository extends JpaRepository<Order, Long>{

    //repo for get - for users to view their order history
    //expose endpoint by using email as query parameter
    //Jpa will execute select * from orders left outer join customer on orders.customer_id=customer.id
    //where customer.email=:email
    Page<Order> findByCustomerEmail(@Param("email")String email, Pageable pageable);
    
}
