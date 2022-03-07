 package com.example.springbootecommerce.config;


 import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;

import com.example.springbootecommerce.models.Order;
import com.example.springbootecommerce.models.Product;
import com.example.springbootecommerce.models.ProductCategory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
 import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

 import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
 import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;


 @Configuration
 public class MyDataRestConfig implements RepositoryRestConfigurer{
    
      private EntityManager entityManager;

      @Autowired
      public MyDataRestConfig(EntityManager theEntityManager){
            entityManager = theEntityManager;
      }


     @Override
     public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors){
          HttpMethod[] theUnsupportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE, HttpMethod.PATCH};

            //to disable HTTP for put, post, delete
             config.getExposureConfiguration() 
                     .forDomainType(Product.class)
                    .withItemExposure((metdata, httpMethods)-> httpMethods.disable(theUnsupportedActions))
                    .withCollectionExposure((metdata, httpMethods)-> httpMethods.disable(theUnsupportedActions));

                    config.getExposureConfiguration() 
                     .forDomainType(ProductCategory.class)
                    .withItemExposure((metdata, httpMethods)-> httpMethods.disable(theUnsupportedActions))
                    .withCollectionExposure((metdata, httpMethods)-> httpMethods.disable(theUnsupportedActions));

                    
                    config.getExposureConfiguration() 
                     .forDomainType(Order.class)
                    .withItemExposure((metdata, httpMethods)-> httpMethods.disable(theUnsupportedActions))
                    .withCollectionExposure((metdata, httpMethods)-> httpMethods.disable(theUnsupportedActions));


                    //internal helper method
                    exposeIds(config);
     }


      //method to expose ids
     private void exposeIds(RepositoryRestConfiguration config){
       

          //getting list of all entity class from entity manager
          Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

          //creating array of entity types
          List<Class> entityClasses = new ArrayList<>();

          //get entity types for entities
          for( EntityType tempEntityType: entities){
            entityClasses.add(tempEntityType.getJavaType());
          }

          //expose the entity ids for the array of entity/domain types
          Class[] domainTypes = entityClasses.toArray(new Class[0]);
          config.exposeIdsFor(domainTypes);
          
        }
 }
