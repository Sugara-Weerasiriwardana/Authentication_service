package com.demo.config;

import com.demo.config.service.RedisService;
import com.demo.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final UserService userService;
    private final RedisService redisService;

    public CustomAuthenticationSuccessHandler(UserService userService, RedisService redisService) {
        this.userService = userService;
        this.redisService = redisService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        if (authentication.getPrincipal() instanceof OidcUser oidcUser) {
            String userId = oidcUser.getSubject();
            String email = oidcUser.getPreferredUsername();
            String name = oidcUser.getFullName();
            System.out.println("USER ID" + userId);
            redisService.saveObject(userId, userService.saveOrUpdateUser(userId, email, name));
            System.out.println(redisService.getObject(userId));
        }
        response.sendRedirect("http://localhost:3000/"/* "/api/user"*/);
    }
}

