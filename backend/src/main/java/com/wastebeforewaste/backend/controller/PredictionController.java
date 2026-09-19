package com.wastebeforewaste.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class PredictionController {

    private final RestTemplate restTemplate = new RestTemplate();

    @PostMapping("/prediction")
    public ResponseEntity<?> predict(@RequestBody Map<String, Object> request) {

        String pythonApi = "http://127.0.0.1:8000/predict";

        ResponseEntity<Map> response =
                restTemplate.postForEntity(
                        pythonApi,
                        request,
                        Map.class
                );

        return ResponseEntity.ok(response.getBody());
    }
}