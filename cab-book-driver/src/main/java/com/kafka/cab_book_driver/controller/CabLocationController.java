package com.kafka.cab_book_driver.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kafka.cab_book_driver.service.CabLocatrionService;

@RestController
@RequestMapping("/location")
public class CabLocationController {

	@Autowired
	private CabLocatrionService cabLocatrionService;

	@PutMapping
	public ResponseEntity<Map<String, String>> updateLocation() throws InterruptedException {

		int range = 100;
		while (range > 0) {
			cabLocatrionService
					.updateLocation(Math.round(Math.random() * 100) + ",  " + Math.round(Math.random() * 100));
			Thread.sleep(1000);
			range--;
		}

		return new ResponseEntity<>(Map.of("message", "Location updated successfully"), HttpStatus.OK);
	}

}
