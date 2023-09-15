package ua.edu.ukma.common.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class UserCredentials {
    private String email;
    private String password;
}
