package com.touilicode.ecommerce.config;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        // protect endpoint /api/orders
        http.authorizeRequests()
                .antMatchers("/api/orders/**")
                .authenticated()
                .and()
                .oauth2ResourceServer()
                .jwt();

        // add CORS filters
        http.cors();

        // force a non-empty response body for 401's to make the response more friendly (TEST IT WITH POSTMAN)
       Okta.configureResourceServer401ResponseBody(http);

       //AT THE END OF THIS TRAINING AFTER ADDING THIS CLASS (SPRING SECURITY), THE WEB APPLICATION DOESN'T WORK!
        // WHEN WE CLICK ON THE 'CHECKOUT' BUTTON, WE HAVE AN ERROR : 403, ACCESS FORBIDEN. TO RESOLVE THIS ISSUE, WE MUST DISABLE 'CSRF'

        //-----------------  As we use 'STORAGE SESSION' AND NOT 'COOKIES SESSION', WE MUST ADD THIS LINE/CODE -------------------------
        http.csrf().disable();





    }
}