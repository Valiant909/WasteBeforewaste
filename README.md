# 🍽️ Waste Before Waste | AI Food Intelligence

> **Predict demand. Simulate decisions. Prevent food waste.**

Waste Before Waste is an **AI-powered food demand intelligence system** designed to help food-service operations decide **how much food to prepare before cooking**, reducing unnecessary surplus, shortage risk, and financial loss.

The system combines **Machine Learning, Digital Twin simulation, What-if analysis, and economic impact estimation** to turn demand predictions into practical preparation decisions.

---

## 🚨 Problem

Food-service operations often prepare food based on estimates rather than data-driven demand prediction.

This can result in:

* 🍱 Excess food preparation
* 🗑️ Preventable food waste
* 💰 Financial losses
* ⚠️ Shortage during unexpected demand
* 📉 Inefficient resource utilization

The challenge is not only predicting demand — it is making the **right preparation decision before the food is prepared**.

---

## 💡 Our Solution

**Waste Before Waste** predicts expected meal demand and provides an AI-assisted preparation recommendation.

The system allows users to:

1. Enter operational and environmental conditions.
2. Predict expected food demand using Machine Learning.
3. Compare predicted demand with planned preparation.
4. Test different preparation scenarios using a Digital Twin.
5. Estimate surplus, potential waste, and financial impact.
6. Receive an actionable recommendation.

---

## 🤖 AI / Machine Learning

The ML engine uses a **Random Forest Regression** model for food-demand prediction.

### Input Features

* Temperature
* Rainfall
* Holiday status
* Weekend status
* Special event status
* Planned meals

### Output

* Predicted meal demand

The trained model is used by the prediction service to provide demand estimates to the application.

---

## 🧠 Digital Twin

The Digital Twin allows users to simulate different preparation levels before making a real-world decision.

Example:

| Preparation | Predicted Demand | Scenario                  |
| ----------: | ---------------: | ------------------------- |
|   450 meals |        495 meals | Shortage                  |
|   510 meals |        495 meals | Balanced / AI Recommended |
|   550 meals |        495 meals | Surplus                   |

This helps decision-makers understand the consequences of preparing more or less food.

---

## 🔮 What-if Simulation

Users can change the preparation quantity and immediately see:

* Demand vs preparation
* Surplus meals
* Potential waste
* Estimated waste cost
* Scenario risk
* Recommendation

### Example

If:

**Predicted Demand = 495 meals**

and:

**Preparation = 550 meals**

then:

**Potential Surplus = 55 meals**

If food cost is ₹60 per meal:

**Potential Waste Cost = ₹3,300**

---

## 💰 Economic Impact

The system converts food waste into an understandable financial metric.

### Example

```text
Potential Surplus
        ↓
Unused Meals
        ↓
Food Cost per Meal
        ↓
Potential Waste Cost
```

This makes the system useful not only from a sustainability perspective but also from a **business decision-making perspective**.

---

## 🏗️ System Architecture

```text
                USER
                  │
                  ▼
          ┌───────────────┐
          │   Frontend    │
          │ HTML/CSS/JS   │
          └───────┬───────┘
                  │
                  ▼
          ┌───────────────┐
          │ Spring Boot   │
          │   Backend     │
          └───────┬───────┘
                  │
                  ▼
          ┌───────────────┐
          │ Python / ML   │
          │    Engine     │
          └───────┬───────┘
                  │
                  ▼
          ┌───────────────┐
          │ Random Forest │
          │    Model      │
          └───────────────┘
```

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* SVG-based visualizations

### Backend

* Java
* Spring Boot
* REST API

### Machine Learning

* Python
* Scikit-learn
* Random Forest Regression
* FastAPI

### Data

* CSV-based food demand dataset

---

## 📁 Project Structure

```text
WasteBeforewaste/
│
├── ml_engine/
│   ├── app.py
│   ├── predict.py
│   ├── trainmodel.py
│   ├── what_if.py
│   ├── generate_data.py
│   └── data/
│       └── food_demand.csv
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── README.md
```

> Folder names may vary slightly depending on the current project structure.

---

## 🚀 How to Run

### 1. Clone the repository

```bash
git clone https://github.com/Valiant909/WasteBeforewaste.git
```

### 2. Start the ML Engine

Navigate to the ML engine:

```bash
cd ml_engine
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI service:

```bash
uvicorn app:app --reload --port 8000
```

### 3. Start Spring Boot Backend

Open the Spring Boot backend project and run:

```bash
mvn spring-boot:run
```

The backend runs on:

```text
http://localhost:8080
```

### 4. Open the Frontend

Open:

```text
frontend/index.html
```

in a browser.

---

## 📊 Key Features

### AI Demand Prediction

Predicts expected meal demand using historical and contextual data.

### Demand vs Preparation

Visual comparison between predicted demand and planned preparation.

### Digital Twin

Simulates different preparation scenarios before taking action.

### What-if Analysis

Tests the impact of changing preparation quantities.

### Risk Indicator

Identifies shortage, balanced, or surplus scenarios.

### Economic Impact

Calculates potential waste cost.

### Explainable Decision Support

Provides an understandable recommendation instead of only showing a prediction.

---

## 🌱 Impact

Waste Before Waste aims to help food-service operations:

* Reduce avoidable food waste
* Improve preparation planning
* Reduce unnecessary food expenditure
* Avoid shortages
* Make data-driven operational decisions
* Support sustainable food management

---

## 🔭 Future Scope

Potential future improvements include:

* Real-time weather API integration
* Real-time inventory integration
* Restaurant/canteen POS integration
* More advanced demand forecasting models
* Automated daily recommendations
* Cloud deployment
* Multi-location demand analysis
* Real-time monitoring dashboard
* Historical waste tracking
* Carbon-footprint estimation

---

## 👩‍💻 Project

**Waste Before Waste | AI Food Intelligence**

Built using **Machine Learning + Digital Twin + What-if Simulation + Decision Intelligence**.

---

## 📌 Repository

GitHub:

https://github.com/Valiant909/WasteBeforewaste
