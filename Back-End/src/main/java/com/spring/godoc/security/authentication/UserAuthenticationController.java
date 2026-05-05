package com.spring.godoc.security.authentication;



import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.godoc.domains.user.UserEntity;
import com.spring.godoc.domains.user.UserService;
import com.spring.godoc.domains.user.dtos.UserLoginRequest;
import com.spring.godoc.domains.user.dtos.UserLoginResponse;
import com.spring.godoc.domains.user.dtos.UserRegisterRequestDTO;
import com.spring.godoc.domains.user.dtos.UserRegisterResponseDTO;
import com.spring.godoc.security.jwt.JwtService;

@RestController
@RequestMapping("/authn")
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

        try{

            /*Criando o "token de autenticação não autenticado" com as informações recebidas*/
            /*Possui por padrão o authenticated = false*/
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userLoginRequest.email(), userLoginRequest.password());

            /*O Authentication Manager é o metodo que valída se o authenticationToken existe na base de dados*/
            /*Ele chama o UserDetailsServiceImpl e usa o metodo loadUserByUsername*/
            /*Se for válido, retorna um Authentication autenticado(authenticated = true) */
            Authentication authentication = authenticationManager.authenticate(authenticationToken);


            /*Fazendo um downCasting para recuperar o userDetailsImpl*/
            UserDetailsImpl userDetails =  (UserDetailsImpl) authentication.getPrincipal();

            /*Recuperando a role*/
            UserEntity user = userDetails.getUser();
            String role = user.getRole().toString();


            /*Passando o UserDetailsImpl com as informações do User para o JWT criar o token*/
            String token = jwtService.generateToken(userDetails);
            Long expiresIn = jwtService.getExpirationTime();

            UserLoginResponse response = new UserLoginResponse(token, userDetails.getUsername(), role, expiresIn);

            return ResponseEntity.ok().body(response);

        } catch (AuthenticationException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais Inválidas");
        }
    };

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRegisterRequestDTO userRegisterRequestDTO) {

        UserEntity newUser = userService.saveUser(userRegisterRequestDTO);

        UserRegisterResponseDTO responseDTO = new UserRegisterResponseDTO(newUser.getId(), newUser.getEmail(), "Usuário Criado com sucesso!");

        return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    };
}
