
import pandas as pd
import random
from datetime import datetime, timedelta

# Number of records
rows = 730

data = []

start_date = datetime(2025, 1, 1)

for i in range(rows):

    date = start_date + timedelta(days=i)

    temperature = random.randint(15, 40)
    rainfall = round(random.uniform(0, 20), 2)

    is_holiday = random.choice([0, 1])
    is_weekend = 1 if date.weekday() >= 5 else 0
    special_event = random.choice([0, 1])

    # Base demand
    demand = 450

    # Temperature effect
    if temperature > 30:
        demand += 30
    elif temperature < 20:
        demand -= 20

    # Rainfall effect
    if rainfall > 10:
        demand -= 25

    # Holiday effect
    if is_holiday == 1:
        demand += 40

    # Weekend effect
    if is_weekend == 1:
        demand += 25

    # Special event effect
    if special_event == 1:
        demand += 60

    # Random variation
    demand += random.randint(-30, 30)

    demand = max(100, demand)

    data.append([
        date.strftime("%Y-%m-%d"),
        temperature,
        rainfall,
        is_holiday,
        is_weekend,
        special_event,
        demand
    ])

df = pd.DataFrame(data, columns=[
    "date",
    "temperature",
    "rainfall",
    "is_holiday",
    "is_weekend",
    "special_event",
    "demand"
])

# Save dataset
df.to_csv("data/demand_data.csv", index=False)

print("Dataset generated successfully!")
print("Rows:", len(df))
print("Saved to: data/demand_data.csv")

