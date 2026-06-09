package com.spring.godoc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication
public class GodocApplication {

	public static void main(String[] args) {
		SpringApplication.run(GodocApplication.class, args);
	}
}
