package com.example.demo.controller;

import com.example.demo.Dto.OAuthLoginDto;
import com.example.demo.Dto.UserDto;
import com.example.demo.Dto.UserResDto;
import com.example.demo.IService.IUserService;
import com.example.demo.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private IUserService userService;

    @GetMapping
    public List<UserResDto> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return users.stream().map(user -> {
            UserResDto dto = new UserResDto();
            dto.setId(user.getId());
            dto.setUsername(user.getUsername());
            dto.setLocation(user.getLocation());
            dto.setEmail(user.getEmail());
            dto.setPhoneNumber(user.getPhoneNumber());
            return dto;
        }).collect(Collectors.toList());
    }


    @PostMapping
    public User create(@RequestBody User user) {
        return userService.createUser(user);
    }
    @PostMapping("/login")
    public User login(@RequestBody UserDto loginDto) {

        return userService.login(loginDto);
    }
    @PostMapping("/oauth-login")
    public User oauthLogin(@RequestBody OAuthLoginDto dto) {
        return userService.oauthLogin(dto);
    }


}

