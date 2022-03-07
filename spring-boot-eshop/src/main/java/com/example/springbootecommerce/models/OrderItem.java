package com.example.springbootecommerce.models;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;



@Entity
@Table(name="order_item")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="image_url")
    private String imageUrl;

    @Column(name="price")
    private BigDecimal price;

    @Column(name="quantity")
    private int quantity;

    @Column(name="product_id")
    private Long productId;


    public Long getId() { return id; }

    public void setId(Long id) { this.id = id;
    }

    public String getImageUrl() { return imageUrl;
    }

    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl;
    }

    public BigDecimal getPrice() { return price;
    }
    public void setPrice(BigDecimal price) { this.price = price;}

    public int getQuantity() { return quantity; }

    public void setQuantity(int quantity) {this.quantity = quantity; }

    public Long getProductId() { return productId;
    }

    public void setProductId(Long productId) {this.productId = productId; }

    @ManyToOne
    @JoinColumn(name="order_id")
    private Order order;

    public Order getOrder() { return order; }

    public void setOrder(Order order) { this.order = order; }

}
