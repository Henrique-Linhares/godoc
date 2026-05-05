package com.spring.godoc.core.security.authentication;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import com.spring.godoc.modules.cadastro.user.UserEntity;
import com.spring.godoc.modules.cadastro.user.UserService;
import com.spring.godoc.modules.cadastro.user.dtos.UserLoginRequest;
import com.spring.godoc.modules.cadastro.user.dtos.UserLoginResponse;
import com.spring.godoc.modules.cadastro.user.dtos.UserRegisterRequestDTO;
import com.spring.godoc.modules.cadastro.user.dtos.UserRegisterResponseDTO;
import com.spring.godoc.core.security.jwt.JwtService;

@RestController
@RequestMapping("/auth")
public class UserAuthenticationController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public UserAuthenticationController(UserService userService, AuthenticationManager authenticationManager, JwtService jwtService) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginRequest userLoginRequest) {
        try {
            UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(userLoginRequest.email(), userLoginRequest.password());

            Authentication authentication = authenticationManager.authenticate(authenticationToken);

            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            UserEntity user = userDetails.getUser();
            String role = user.getRole().toString();

            String token = jwtService.generateToken(userDetails);
            Long expiresIn = jwtService.getExpirationTime();

            UserLoginResponse response = new UserLoginResponse(token, userDetails.getUsername(), role, expiresIn);
            return ResponseEntity.ok().body(response);

        } catch (AuthenticationException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais Inválidas");
        }
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRegisterRequestDTO userRegisterRequestDTO) {
        UserEntity newUser = userService.saveUser(userRegisterRequestDTO);
        UserRegisterResponseDTO responseDTO = new UserRegisterResponseDTO(newUser.getId(), newUser.getEmail(), "Usuário Criado com sucesso!");
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    }
}
