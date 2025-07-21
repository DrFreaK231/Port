package com.example.demo.service;

import com.example.demo.Dto.OAuthLoginDto;
import com.example.demo.Dto.UserDto;
import com.example.demo.IService.IUserService;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.AuthProvider;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService {

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public String hashPassword(String rawPassword) {
        return passwordEncoder.encode(rawPassword);
    }
    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User createUser(User user) {
        String hashed = hashPassword(user.getPassword());
        user.setPassword(hashed);
        return userRepository.save(user);
    }

    public User login(UserDto loginDto) {
        User user = userRepository.findUser(loginDto.getIdentifier());
        if (user != null && passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
            return user;
        }
        return null;
    }
    public User oauthLogin(OAuthLoginDto dto) {
        Optional<User> optionalUser = userRepository.findByUsernameAndProvider(dto.getUsername(), dto.getProvider());
        if (optionalUser.isPresent()) {
            return optionalUser.get();
        } else {
            User newUser = new User();
            newUser.setUsername(dto.getUsername());
            newUser.setProvider(dto.getProvider());
            newUser.setPassword(passwordEncoder.encode("oauthuser"));
            return userRepository.save(newUser);
        }
    }




}
