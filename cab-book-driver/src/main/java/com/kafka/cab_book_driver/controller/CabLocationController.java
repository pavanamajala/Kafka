package com.kafka.cab_book_driver.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kafka.cab_book_driver.service.CabLocatrionService;

@RestController
@RequestMapping("/location")
@CrossOrigin(origins = "http://localhost:3000")
public class CabLocationController {

	@Autowired
	private CabLocatrionService cabLocatrionService;

	@PutMapping("/send")
	public ResponseEntity<Map<String, String>> updateLocation(@RequestBody String str) {
		cabLocatrionService.updateLocation(str);
		return new ResponseEntity<>(Map.of("message", "Location updated successfully"), HttpStatus.OK);
	}

}
