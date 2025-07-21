package com.example.demo.IService;

import com.example.demo.Dto.OAuthLoginDto;
import com.example.demo.Dto.UserDto;
import com.example.demo.model.User;

import java.util.List;

public interface IUserService {
    List<User> getAllUsers();
    User createUser(User user);
    User login(UserDto login);
    public User oauthLogin(OAuthLoginDto dto) ;
}