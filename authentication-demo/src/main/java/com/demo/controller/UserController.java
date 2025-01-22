package com.demo.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {

    @GetMapping("/user")
    public String getUserInfo(@AuthenticationPrincipal OidcUser oidcUser) {
        System.out.println(oidcUser);
        String userId = oidcUser.getSubject();
        String email = oidcUser.getPreferredUsername();
        String name = oidcUser.getFullName();

        return String.format("User ID: %s, Name: %s, Email: %s", userId, name, email);
    }

}
