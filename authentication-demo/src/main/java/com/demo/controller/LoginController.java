package com.demo.controller;

import com.demo.config.service.RedisService;
import com.demo.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.*;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@RestController
@RequestMapping("/api")
public class LoginController {

    private final OAuth2AuthorizedClientManager authorizedClientManager;
    private final RedisService redisService;

    public LoginController(OAuth2AuthorizedClientManager authorizedClientManager, RedisService redisService) {
        this.authorizedClientManager = authorizedClientManager;
        this.redisService = redisService;
    }

    @GetMapping("/token")
    public String getToken(OAuth2AuthenticationToken authentication, @AuthenticationPrincipal OidcUser oidcUser) {
        OAuth2AuthorizeRequest authorizeRequest = OAuth2AuthorizeRequest
                .withClientRegistrationId(authentication.getAuthorizedClientRegistrationId())
                .principal(authentication)
                .build();

        // Autoriza el cliente y obtiene el token
        OAuth2AuthorizedClient authorizedClient = authorizedClientManager.authorize(authorizeRequest);

        if (authorizedClient == null) {
            throw new IllegalStateException("No se pudo autorizar el cliente.");
        }
        if (Objects.isNull(redisService.getObject(oidcUser.getSubject()))) {
            return "Access denied";
        }
        // Retorna el Access Token
        return "Bearer " + authorizedClient.getAccessToken().getTokenValue();

    }
}
