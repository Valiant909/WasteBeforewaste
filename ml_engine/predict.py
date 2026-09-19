import joblib
import pandas as pd

# Load trained model
model = joblib.load("models/demand_model.pkl")

# Tomorrow's conditions
tomorrow = pd.DataFrame([{
    "temperature": 30,
    "rainfall": 2,
    "is_holiday": 0,
    "is_weekend": 0,
    "special_event": 0
}])

# Predict demand
prediction = model.predict(tomorrow)
predicted_demand = round(prediction[0])

# Planned preparation
planned_meals = 550

# Waste calculation
potential_surplus = max(0, planned_meals - predicted_demand)

food_cost_per_meal = 60
potential_waste_cost = potential_surplus * food_cost_per_meal

# Recommendation
recommended_preparation = round(predicted_demand * 1.03)

print("--------------------------------")
print("WASTE BEFORE WASTE")
print("--------------------------------")

print("Predicted demand:", predicted_demand, "meals")
print("Planned preparation:", planned_meals, "meals")
print("Potential surplus:", potential_surplus, "meals")
print("Potential waste cost: ₹", potential_waste_cost)

print("Recommended preparation:",
      recommended_preparation, "meals")

print("--------------------------------")