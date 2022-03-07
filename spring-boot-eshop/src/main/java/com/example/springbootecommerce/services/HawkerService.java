 package com.example.springbootecommerce.services;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.LinkedList;
import java.util.List;

import com.example.springbootecommerce.models.Hawker;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

@Service
public class HawkerService {
    
    Logger logger = LoggerFactory.getLogger(HawkerService.class);
    
    private String urlHawker = "https://api.jael.ee/datasets/hawker";

     public List<Hawker> getHawker() {
         
         final String url = UriComponentsBuilder
             .fromUriString(urlHawker)
             .toUriString();
 

         final RequestEntity<Void> req = RequestEntity.get(url).build();
         final RestTemplate template = new RestTemplate();
         final ResponseEntity<String> resp = template.exchange(req, String.class);
 
         if (resp.getStatusCode() != HttpStatus.OK)
             throw new IllegalArgumentException(
                 "Error: status code %s".formatted(resp.getStatusCode().toString())
             );
     
         final String body = resp.getBody();
 
         System.out.println("==========> body " + body);
 
         List<Hawker> hawList = new LinkedList<>();
         try(InputStream is = new ByteArrayInputStream(body.getBytes())){
             final JsonReader reader = Json.createReader(is);
             final JsonArray result = reader.readArray();
             
             //final JsonString name = result.getJsonObject(0).getJsonString("name");
             for(int i = 0; i < result.size(); i++){
                 JsonObject hawkerObj = result.getJsonObject(i);
                 Hawker hawker = Hawker.create(hawkerObj);
                 hawList.add(hawker);
             }
             return hawList;
 
         } catch (Exception ex) {
                 System.out.println("=======> json array error");
         }
         return hawList;
 
     }
 
}
