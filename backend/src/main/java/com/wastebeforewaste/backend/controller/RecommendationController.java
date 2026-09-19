package com.wastebeforewaste.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class RecommendationController {

    @PostMapping("/recommendation")
    public ResponseEntity<?> recommendation(
            @RequestBody Map<String, Object> data) {

        int predictedDemand =
                ((Number) data.get("predicted_demand")).intValue();

        int plannedPreparation =
                ((Number) data.get("planned_preparation")).intValue();

        int recommendedPreparation =
                ((Number) data.get("recommended_preparation")).intValue();

        double moneySaved =
                ((Number) data.get("money_saved")).doubleValue();

        double wasteReduction =
                ((Number) data.get("waste_reduction_percent")).doubleValue();

        String riskLevel =
                String.valueOf(data.get("risk_level"));

        int surplus =
                ((Number) data.get("potential_surplus")).intValue();

        int shortage =
                ((Number) data.get("potential_shortage")).intValue();

        String recommendation;

        if (shortage > 0) {

            recommendation =
                    "Increase food preparation to approximately "
                    + recommendedPreparation
                    + " meals to reduce the risk of shortage.";

        } else if (plannedPreparation > recommendedPreparation) {

            recommendation =
                    "Reduce preparation from "
                    + plannedPreparation
                    + " to approximately "
                    + recommendedPreparation
                    + " meals. This can reduce potential surplus and save around ₹"
                    + Math.round(moneySaved)
                    + ".";

        } else {

            recommendation =
                    "Current preparation is close to the recommended level. "
                    + "Maintain approximately "
                    + recommendedPreparation
                    + " meals.";
        }

        String explanation =
                "Expected demand is "
                + predictedDemand
                + " meals. ";

        if (surplus > 0) {
            explanation +=
                    "The current plan may create a surplus of "
                    + surplus
                    + " meals. ";
        }

        if (shortage > 0) {
            explanation +=
                    "The current plan may create a shortage of "
                    + shortage
                    + " meals. ";
        }

        explanation +=
                "Estimated waste-cost reduction is "
                + wasteReduction
                + "%, with a potential saving of ₹"
                + Math.round(moneySaved)
                + ". Risk level is "
                + riskLevel
                + ".";

        Map<String, Object> result = new HashMap<>();

        result.put("decision", recommendation);
        result.put("explanation", explanation);
        result.put("predicted_demand", predictedDemand);
        result.put("recommended_preparation", recommendedPreparation);
        result.put("money_saved", moneySaved);
        result.put("waste_reduction_percent", wasteReduction);
        result.put("risk_level", riskLevel);

        return ResponseEntity.ok(result);
    }
}