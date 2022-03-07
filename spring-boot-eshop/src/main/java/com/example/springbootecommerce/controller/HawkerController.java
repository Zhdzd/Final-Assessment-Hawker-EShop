package com.example.springbootecommerce.controller;
import java.util.Collections;
import java.util.List;

import com.example.springbootecommerce.models.Hawker;
import com.example.springbootecommerce.services.HawkerService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;

@RestController
@RequestMapping(path="/api", produces=MediaType.APPLICATION_JSON_VALUE)
public class HawkerController {
    public static final Logger logger =LoggerFactory.getLogger(HawkerController.class);
    @Autowired
    private HawkerService hawkerSvc;

    @GetMapping(path ="/location")
    public ResponseEntity<String> getHawkerAsJson(){
        List<Hawker> hawkerInfo = Collections.emptyList();

        try{
            hawkerInfo = hawkerSvc.getHawker();
        } catch (Exception ex){
            logger.info(">>> cannot get hawker svc");
        }
        System.out.println("============> hawker info " + hawkerInfo);

        JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();

       

        final JsonArrayBuilder arrBuilder = Json.createArrayBuilder();
        hawkerInfo.stream()
                .forEach(v -> arrBuilder.add(v.toJson()));

    
        return ResponseEntity.ok(hawkerInfo.toString());

        }
}
