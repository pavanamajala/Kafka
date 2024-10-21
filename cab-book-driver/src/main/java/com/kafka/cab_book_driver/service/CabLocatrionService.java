package com.kafka.cab_book_driver.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class CabLocatrionService {
	
	@Autowired
	private KafkaTemplate<String, Object> kafkaTemplate;

	public boolean updateLocation(String location) {
		kafkaTemplate.send("cab-location", location);
		return true;
	}

}
