package com.example.springbootecommerce.models;
import java.io.ByteArrayInputStream;
import java.io.InputStream;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

public class Hawker {
    private String name;
    private String address;
    private Integer postalCode;

  
    public String getName() {
        return name;
    }

  
    public void setName(String name) {
        this.name = name;
    }

  
    public String getAddress() {
        return address;
    }

   
    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getPostalCode() {
        return postalCode;
    }

  
    public void setPostalCode(Integer postalCode) {
        this.postalCode = postalCode;
    }
    public static Hawker create(JsonObject jObj){
        Hawker hwk = new Hawker();
        hwk.setName(jObj.getString("name"));
        hwk.setAddress(jObj.getString("address"));
        hwk.setPostalCode(jObj.getInt("postalcode"));
        return hwk;
    }
    public static Hawker create(String jsonString){
        try(InputStream is = new ByteArrayInputStream(jsonString.getBytes())){
            JsonReader reader = Json.createReader(is);
            return create(reader.readObject());
        } catch (Exception ex) {}
        return new Hawker();
    }
     public JsonObject toJson(){
         return Json.createObjectBuilder()
             .add("name", name)
             .add("address",address)
             .add("postalcode", postalCode)
             .build();
     }


    public String toString(){
        return this.toJson().toString();
    }

}

    

