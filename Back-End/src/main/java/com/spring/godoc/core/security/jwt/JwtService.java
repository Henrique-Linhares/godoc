package com.spring.godoc.core.security.jwt;

import java.time.Instant;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

    private final JwtEncoder jwtEncoder;
    private final JwtDecoder jwtDecoder;
    private final JwtProperties jwtProperties;

    public JwtService(JwtEncoder jwtEncoder, JwtDecoder jwtDecoder, JwtProperties jwtProperties) {
        this.jwtEncoder = jwtEncoder;
        this.jwtDecoder = jwtDecoder;
        this.jwtProperties = jwtProperties;
    }

    public String generateToken(UserDetails userDetails) {
        Instant now = Instant.now();
        Instant expiresAt = now.plusMillis(jwtProperties.getExpirationTime());

        String roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("godoc")
                .issuedAt(now)
                .expiresAt(expiresAt)
                .subject(userDetails.getUsername())
                .claim("roles", roles)
                .build();

        JwsHeader header = JwsHeader.with(MacAlgorithm.HS256).build();
        Jwt jwt = jwtEncoder.encode(JwtEncoderParameters.from(header, claims));
        return jwt.getTokenValue();
    }

    public boolean isTokenValid(String token) {
        try {
            jwtDecoder.decode(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }

    public String extractUsername(String token) {
        Jwt jwt = jwtDecoder.decode(token);
        return jwt.getSubject();
    }

    public String extractRoles(String token) {
        Jwt jwt = jwtDecoder.decode(token);
        return jwt.getClaim("roles");
    }

    public Long getExpirationTime() {
        return jwtProperties.getExpirationTime();
    }

    public String updateRoleAndGenerateNewToken(String oldToken, String newRole) {
        Jwt jwt = jwtDecoder.decode(oldToken);

        String username = jwt.getSubject();
        String role = "ROLE_" + newRole;
        Instant now = Instant.now();
        Instant expiresAt = now.plusMillis(jwtProperties.getExpirationTime());

        JwtClaimsSet claims = JwtClaimsSet.builder()
            .issuer("godoc")
            .issuedAt(now)
            .expiresAt(expiresAt)
            .subject(username)
            .claim("roles", role)
            .build();

        JwsHeader header = JwsHeader.with(MacAlgorithm.HS256).build();
        Jwt newJwt = jwtEncoder.encode(JwtEncoderParameters.from(header, claims));
        return newJwt.getTokenValue();
    }
}
