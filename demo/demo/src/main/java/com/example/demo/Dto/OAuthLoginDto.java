package com.example.demo.Dto;

import com.example.demo.Enums.AuthProviders;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

public class OAuthLoginDto {
    private String username;

    @Enumerated(EnumType.STRING)
    private AuthProviders provider;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public AuthProviders getProvider() {
        return provider;
    }

    public void setProvider(AuthProviders provider) {
        this.provider = provider;
    }

    public OAuthLoginDto(String username, AuthProviders provider) {
        this.username = username;
        this.provider = provider;
    }

    public OAuthLoginDto() {
    }
}
