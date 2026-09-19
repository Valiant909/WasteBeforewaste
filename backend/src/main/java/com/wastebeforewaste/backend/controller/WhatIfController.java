package com.wastebeforewaste.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class WhatIfController {

    private final RestTemplate restTemplate = new RestTemplate();

    @PostMapping("/what-if")
    public ResponseEntity<?> whatIf(@RequestBody WhatIfRequest request) {

        // 1. Send weather/event data to Python ML API
        String pythonApi = "http://127.0.0.1:8000/predict";

        Map<String, Object> mlRequest = new HashMap<>();

        mlRequest.put("temperature", request.getTemperature());
        mlRequest.put("rainfall", request.getRainfall());
        mlRequest.put("is_holiday", request.getIsHoliday());
        mlRequest.put("is_weekend", request.getIsWeekend());
        mlRequest.put("special_event", request.getSpecialEvent());

        ResponseEntity<Map> mlResponse =
                restTemplate.postForEntity(
                        pythonApi,
                        mlRequest,
                        Map.class
                );

        // 2. Get predicted demand
        Map mlResult = mlResponse.getBody();

        int predictedDemand =
                ((Number) mlResult.get("predicted_demand")).intValue();

        // 3. Current plan
        int plannedMeals = request.getPlannedMeals();
        double foodCost = request.getFoodCostPerMeal();

        // 4. Recommended preparation
        int recommendedPreparation =
                (int) Math.ceil(predictedDemand * 1.03);

        // 5. Current plan calculations
        int currentSurplus =
                Math.max(0, plannedMeals - predictedDemand);

        double currentWasteCost =
                currentSurplus * foodCost;

        // 6. Optimized plan calculations
        int optimizedSurplus =
                Math.max(0, recommendedPreparation - predictedDemand);

        double optimizedWasteCost =
                optimizedSurplus * foodCost;

        // 7. Money saved
        double moneySaved =
                Math.max(0, currentWasteCost - optimizedWasteCost);

        // 8. Waste reduction percentage
        double wasteReduction = 0;

        if (currentWasteCost > 0) {
            wasteReduction =
                    (moneySaved / currentWasteCost) * 100;
        }

        // 9. ROI
        double roi = 0;

        if (currentWasteCost > 0) {
            roi =
                    (moneySaved / currentWasteCost) * 100;
        }

        // 10. Shortage calculation
        int shortage =
                Math.max(0, predictedDemand - plannedMeals);

        double shortageCost =
                shortage * foodCost;

        // 11. Risk
        String risk;

        if (shortage > 0) {

            risk = shortage > predictedDemand * 0.10
                    ? "HIGH"
                    : "MEDIUM";

        } else if (currentSurplus > 0) {

            risk = currentSurplus > predictedDemand * 0.15
                    ? "HIGH"
                    : "MEDIUM";

        } else {

            risk = "LOW";
        }

        // 12. Recommendation
        String recommendation;

        if (plannedMeals > recommendedPreparation) {

            recommendation =
                    "Reduce preparation to "
                    + recommendedPreparation
                    + " meals to minimize waste.";

        } else if (plannedMeals < predictedDemand) {

            recommendation =
                    "Increase preparation to at least "
                    + recommendedPreparation
                    + " meals to avoid shortage.";

        } else {

            recommendation =
                    "Current preparation is close to the recommended level.";
        }

        // 13. Final response
        Map<String, Object> result = new HashMap<>();

        result.put("predicted_demand", predictedDemand);
        result.put("planned_preparation", plannedMeals);

        result.put(
                "recommended_preparation",
                recommendedPreparation
        );

        result.put("potential_surplus", currentSurplus);
        result.put("potential_shortage", shortage);

        result.put(
                "potential_waste_cost",
                currentWasteCost
        );

        result.put(
                "potential_shortage_cost",
                shortageCost
        );

        result.put(
                "optimized_surplus",
                optimizedSurplus
        );

        result.put(
                "optimized_waste_cost",
                optimizedWasteCost
        );

        result.put(
                "money_saved",
                moneySaved
        );

        result.put(
                "waste_reduction_percent",
                Math.round(wasteReduction * 100.0) / 100.0
        );

        result.put(
                "roi_percent",
                Math.round(roi * 100.0) / 100.0
        );

        result.put("risk_level", risk);
        result.put("recommendation", recommendation);

        return ResponseEntity.ok(result);
    }
}