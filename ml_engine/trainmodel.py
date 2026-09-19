import pandas as pd
import joblib

from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score

# Load dataset
df = pd.read_csv("data/food_demand.csv")

# Features used for prediction
features = [
    "temperature",
    "rainfall",
    "is_holiday",
    "is_weekend",
    "special_event"
]

X = df[features]
y = df["meals_consumed"]

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# Create ML model
model = RandomForestRegressor(
    n_estimators=200,
    random_state=42
)

# Train
model.fit(X_train, y_train)

# Test
predictions = model.predict(X_test)

mae = mean_absolute_error(y_test, predictions)
r2 = r2_score(y_test, predictions)

print("Model trained successfully!")
print("MAE:", round(mae, 2))
print("R²:", round(r2, 2))

# Save model
joblib.dump(model, "models/demand_model.pkl")

print("Model saved to models/demand_model.pkl")