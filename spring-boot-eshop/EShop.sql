DROP SCHEMA IF EXISTS eshop;

CREATE SCHEMA eshop;
USE  eshop ;

CREATE TABLE IF NOT EXISTS product_category (
  id BIGINT(20) NOT NULL AUTO_INCREMENT,
  category_name VARCHAR(255) ,
  PRIMARY KEY (id)) 
  ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS product (
  id BIGINT(20) NOT NULL AUTO_INCREMENT,
  name VARCHAR(255),
  description VARCHAR(255),
  price DECIMAL(13,2),
  image_url VARCHAR(255),
  category_id BIGINT(20),
  PRIMARY KEY (id),
  KEY fk_category (category_id),
  CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES product_category (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE address(
  id bigint NOT NULL AUTO_INCREMENT,
  street varchar(255),
  city varchar(255),
  unit_number varchar(255),
  postal_code varchar(255),
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE customer (
  id bigint NOT NULL AUTO_INCREMENT,
  first_name varchar(255),
  last_name varchar(255),
  email varchar(255),
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE orders (
  id bigint NOT NULL AUTO_INCREMENT,
  order_tracking_number varchar(255) ,
  total_price decimal(19,2),
  total_quantity int,
  billing_address_id bigint ,
  customer_id bigint,
  delivery_address_id bigint,
  status varchar(128),
  PRIMARY KEY (id),
  UNIQUE KEY UK_billing_address_id (billing_address_id),
  UNIQUE KEY UK_delivery_address_id (delivery_address_id),
  KEY K_customer_id (customer_id),
  CONSTRAINT FK_customer_id FOREIGN KEY (customer_id) REFERENCES customer (id),
  CONSTRAINT FK_billing_address_id FOREIGN KEY (billing_address_id) REFERENCES address (id),
  CONSTRAINT FK_delivery_address_id FOREIGN KEY (delivery_address_id) REFERENCES address (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE order_item (
  id bigint NOT NULL AUTO_INCREMENT,
  image_url varchar(255) DEFAULT NULL,
  quantity int DEFAULT NULL,
  price decimal(19,2) DEFAULT NULL,
  order_id bigint DEFAULT NULL,
  product_id bigint DEFAULT NULL,
  PRIMARY KEY (id),
  KEY K_order_id (order_id),
  CONSTRAINT FK_order_id FOREIGN KEY (order_id) REFERENCES orders (id),
  CONSTRAINT FK_product_id FOREIGN KEY (product_id) REFERENCES product (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

insert into product_category(category_name) 
		values('Appetizers');
insert into product_category(category_name) 
		values('Main Course');
insert into product_category(category_name) 
		values('Drinks');
insert into product_category(category_name) 
		values('Desserts');


-- insert data for product table --
insert into product(name, description, price, image_url,category_id)
		values('Popiah','Perfect combination of sweetness from the sweet sauce, spiciness from the chilli sauce, the savouriness from the meat and the crunchiness from all the fresh vegetables wrapped in it.',
				'4.00', 'assets/images/appetizers/popiah.jpg','1');

insert into product(name, description, price, image_url,category_id)
		values('Satay','Spice marinated meat skewered with a thin wooden stick cooked by grilling over a trough of open charcoal fire. Choice of lamb, beef, chicken available.',
				'8.00', 'assets/images/appetizers/satay.jpg','1');

insert into product(name, description, price, image_url,category_id)
		values('Char Kway Teow','Flat rice noodles stir fried with light and dark soy sauce, chilli, prawns, cockles, egg bean sprouts and Chinese chives.',
				'5.00', 'assets/images/main/CharKwayTeow.jpg','2');
insert into product(name, description, price, image_url,category_id)
		values('Salted Egg Chicken','Creamy sauce that consists of a combination of salted egg yolk,  milk, curry leaves, and chopped chilli , stir-fried with a generous amount of fried chicken.',
				'6.50', 'assets/images/main/saltedegg.jpg','2');
insert into product(name, description, price, image_url,category_id)
		values('Steamed Chicken Rice', 'Aromatic and tasty. The rice grains are fried with the oil from chicken fat, garlic and sesame.',
				'5.50', 'assets/images/main/chickenrice.jpg','2');



insert into product(name, description, price, image_url,category_id)
		values('Kopi Peng Siu Dai','Classic ice coffee with milk, less sweet, greater taste.',
				'2.50', 'assets/images/drinks/kopipeng.jpg','3');
insert into product(name, description, price, image_url,category_id)
		values('Teh peng','Creamy, subtly sweet, and incredibly easy to make with just two ingredients!',
				'3.00', 'assets/images/drinks/tehpeng.jpg','3');
insert into product(name, description, price, image_url,category_id)
		values('Teh o peng','Stronger in flavor, it offers a variety of health benefits as it contains antioxidants and reduces inflammation',
				'3.00', 'assets/images/drinks/teho.jpg','3');


insert into product(name, description, price, image_url,category_id)
		values('Ice Kacang','Thirst-quenching concoction made of shaved ice, red beans, jelly and sweet syrup.',
				'3.00', 'assets/images/desserts/icekacang.jpg','4');
insert into product(name, description, price, image_url,category_id)
		values('Chendol','Bowl of coconut milk based dessert which topped with kidney beans, green strands, and corn served with shaved ice and gula melaka.',
				'4.00', 'assets/images/desserts/icekacang.jpg','4');

        
