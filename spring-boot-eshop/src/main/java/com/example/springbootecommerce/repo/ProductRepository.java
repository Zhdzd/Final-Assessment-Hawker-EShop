package com.example.springbootecommerce.repo;

import org.springframework.data.domain.Pageable;

import com.example.springbootecommerce.models.Product;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;


@CrossOrigin
public interface ProductRepository extends JpaRepository<Product, Long>{

        //query method . match category id with 'id'
        //to check http://localhost:8080/api/products/search/findByCategoryId?id=<insert category id>  in browser 
        Page<Product> findByCategoryId(@RequestParam("id") Long id, Pageable pageable);

        //for searching of products
        //select*from p WHERE p.name LIKE CONCAT('%',:NAME,'%')
        //to check - go to http://localhost:8080/api/products/search/findByNameContaining?name=<insert name> in browser
        Page<Product> findByNameContaining(@RequestParam("name") String name, Pageable pageable);
            
        
}
