package com.example.demo.service;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doAnswer;
import static org.mockito.Mockito.times;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.demo.repository.UserRepository;
import com.example.demo.repository.UtenteLoggatoRepository;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

	UserService userService;

	@Mock
	UtenteLoggatoRepository utenteLoggatoRepository;

	@Mock
	UserRepository userRepository;

	@BeforeEach
	public void setup() {
		userService = new UserService(userRepository, utenteLoggatoRepository);
	}

	@Test
	public void logOutUser() {
		String token = "ciaoMondo";
		doAnswer(t -> {
			return null;
		}).when(utenteLoggatoRepository).deleteByToken(any());
		userService.logOutUser(token);
		Mockito.verify(utenteLoggatoRepository, times(1)).deleteByToken(token);
	}

}
