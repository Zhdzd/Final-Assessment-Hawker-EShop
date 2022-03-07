package com.example.springbootecommerce.config;
 
import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter{
    
    @Override
    protected void configure(HttpSecurity http) throws Exception{

      
        //secure endpoint /api/orders
        //only accessible to authenticated users
        //configure oauth2 resource server support
        //enabling jwt bearer token support
        http.authorizeRequests()
          .antMatchers("/api/orders/**")
            .authenticated()
            .and()
             .oauth2ResourceServer()
            .jwt();

        http.cors();

         //401 unathorized message for unauthenticated users accessing endpoint
         Okta.configureResourceServer401ResponseBody(http);

         //disabling csrf for this case...to enable transaction on angular
         //otherwise must use cookies instead to prevent csrf attacks
         http.csrf().disable();

         //forcing https due deploying to heroku
         http.requiresChannel()
            .requestMatchers(r -> r.getHeader("X-Forwarded-Proto")!=null)
            .requiresSecure();
     }
 }
