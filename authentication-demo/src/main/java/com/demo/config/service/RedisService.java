package com.demo.config.service;

import com.demo.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class RedisService {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    public void saveObject(String key, User value) {
        redisTemplate.opsForValue().set(key, value, Duration.ofMinutes(5));  // Guarda el objeto con la clave dada
    }

    public User getObject(String key) {
        return (User) redisTemplate.opsForValue().get(key);  // Recupera el objeto por su clave
    }
}

