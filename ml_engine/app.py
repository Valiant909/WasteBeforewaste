from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd

app = FastAPI(title="Waste Before Waste ML API")

# Load trained model
model = joblib.load("models/demand_model.pkl")


# Input data
class PredictionRequest(BaseModel):
    temperature: float
    rainfall: float
    is_holiday: int
    is_weekend: int
    special_event: int


@app.get("/")
def home():
    return {
        "message": "Waste Before Waste ML API is running!"
    }


@app.post("/predict")
def predict_demand(data: PredictionRequest):

    input_data = pd.DataFrame([{
        "temperature": data.temperature,
        "rainfall": data.rainfall,
        "is_holiday": data.is_holiday,
        "is_weekend": data.is_weekend,
        "special_event": data.special_event
    }])

    prediction = model.predict(input_data)

    predicted_demand = round(prediction[0])

    return {
        "predicted_demand": predicted_demand
    }