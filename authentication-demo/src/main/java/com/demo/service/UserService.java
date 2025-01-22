package com.demo.service;

import com.demo.models.User;
import com.demo.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User saveOrUpdateUser(String id, String email, String name) {
        User user = userRepository.findById(id).orElse(new User());
        user.setId(id);
        user.setEmail(email);
        user.setUsername(name);
        return userRepository.save(user);
    }
}

