package com.spring.godoc.core.security.authentication;

import com.spring.godoc.core.exceptions.user.UserNotFoundException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.spring.godoc.modules.cadastro.user.UserService;
import jakarta.persistence.EntityNotFoundException;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserService userService;

    public UserDetailsServiceImpl(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        try {
            return new UserDetailsImpl(userService.findByEmail(email));
        } catch (UserNotFoundException e) {
            throw new UserNotFoundException(e.getMessage());
        }
    }
}
