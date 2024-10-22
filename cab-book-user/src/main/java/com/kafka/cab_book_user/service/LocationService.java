package com.kafka.cab_book_user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class LocationService {

	@Autowired
    private SimpMessagingTemplate messagingTemplate;

    @KafkaListener(topics="cab-location", groupId="user-group")
    public void cabLocation(String location) {
        System.out.println(location);
        // Send location to WebSocket
        messagingTemplate.convertAndSend("/topic/cab-location", location);
    }
}
