# Waste Before Waste - What-If Simulator

predicted_demand = 495
food_cost_per_meal = 60

print("--------------------------------")
print("WASTE BEFORE WASTE")
print("WHAT-IF SIMULATOR")
print("--------------------------------")

while True:
    try:
        planned_meals = int(
            input("\nEnter number of meals to prepare (0 to exit): ")
        )

        if planned_meals == 0:
            print("Simulator closed.")
            break

        if planned_meals < 0:
            print("Please enter a positive number.")
            continue

        if planned_meals > predicted_demand:
            surplus = planned_meals - predicted_demand
            shortage = 0
            waste_cost = surplus * food_cost_per_meal
            shortage_cost = 0

            risk = "HIGH" if surplus > predicted_demand * 0.15 else "MEDIUM"

        else:
            surplus = 0
            shortage = predicted_demand - planned_meals
            waste_cost = 0
            shortage_cost = shortage * food_cost_per_meal

            risk = "HIGH" if shortage > predicted_demand * 0.10 else "MEDIUM"

        print("\n--- Simulation Result ---")
        print("Predicted demand:", predicted_demand, "meals")
        print("Planned preparation:", planned_meals, "meals")
        print("Potential surplus:", surplus, "meals")
        print("Potential shortage:", shortage, "meals")
        print("Potential waste cost: ₹", waste_cost)
        print("Potential shortage cost: ₹", shortage_cost)
        print("Risk level:", risk)

        if surplus > 0:
            print("Recommendation: Reduce preparation to avoid food waste.")
        elif shortage > 0:
            print("Recommendation: Increase preparation to avoid shortage.")
        else:
            print("Recommendation: Preparation exactly matches predicted demand.")

        print("--------------------------")

    except ValueError:
        print("Please enter a valid number.")