
/* =========================================================
   WASTE BEFORE WASTE
   AI FOOD INTELLIGENCE — FIXED FRONTEND JS
   ========================================================= */


/* =========================================================
   GLOBAL STATE
   ========================================================= */

let currentDemand = 0;
let currentPreparation = 0;
let currentFoodCost = 0;


/* =========================================================
   RUN AI SIMULATION
   ========================================================= */

async function runSimulation() {

    const temperature =
        Number(document.getElementById("temperature")?.value);

    const rainfall =
        Number(document.getElementById("rainfall")?.value);

    const plannedMeals =
        Number(document.getElementById("plannedMeals")?.value);

    const foodCostPerMeal =
        Number(document.getElementById("foodCostPerMeal")?.value);

    const isHoliday =
        document.getElementById("isHoliday")?.checked ? 1 : 0;

    const isWeekend =
        document.getElementById("isWeekend")?.checked ? 1 : 0;

    const specialEvent =
        document.getElementById("specialEvent")?.checked ? 1 : 0;


    /* =====================================================
       VALIDATION
       ===================================================== */

    if (
        !Number.isFinite(temperature) ||
        !Number.isFinite(rainfall) ||
        !Number.isFinite(plannedMeals) ||
        !Number.isFinite(foodCostPerMeal)
    ) {
        alert("Please enter valid values.");
        return;
    }

    if (plannedMeals <= 0 || foodCostPerMeal <= 0) {
        alert("Meals and food cost must be greater than 0.");
        return;
    }


    /* =====================================================
       UI
       ===================================================== */

    const loading =
        document.getElementById("loading");

    const results =
        document.getElementById("results");

    if (loading) {
        loading.style.display = "block";
    }

    if (results) {
        results.style.opacity = "0.5";
    }


    /* =====================================================
       REQUEST DATA
       ===================================================== */

    const requestData = {
        temperature: temperature,
        rainfall: rainfall,
        isHoliday: isHoliday,
        isWeekend: isWeekend,
        specialEvent: specialEvent,
        plannedMeals: plannedMeals,
        foodCostPerMeal: foodCostPerMeal
    };

    console.log(
        "Sending to Spring Boot:",
        requestData
    );


    /* =====================================================
       SPRING BOOT API
       ===================================================== */

    try {

        const response = await fetch(
            "http://localhost:8080/api/what-if",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(requestData)
            }
        );


        console.log(
            "Spring Boot response status:",
            response.status
        );


        /* =================================================
           SERVER ERROR
           ================================================= */

        if (!response.ok) {

            let errorText = "";

            try {
                errorText = await response.text();
            } catch (e) {
                errorText = "";
            }

            throw new Error(
                "Spring Boot returned HTTP " +
                response.status +
                (errorText
                    ? " — " + errorText
                    : "")
            );
        }


        /* =================================================
           JSON RESPONSE
           ================================================= */

        const data =
            await response.json();

        console.log(
            "Spring Boot data:",
            data
        );


        /* =================================================
           GLOBAL VALUES
           ================================================= */

        currentDemand =
            Number(data.predicted_demand) || 0;

        currentPreparation =
            Number(data.recommended_preparation) ||
            plannedMeals ||
            0;

        currentFoodCost =
            Number(data.foodCostPerMeal) ||
            foodCostPerMeal ||
            0;


        /* =================================================
           PREDICTED DEMAND
           ================================================= */

        setText(
            "predictedDemand",
            currentDemand
        );


        /* =================================================
           AI RECOMMENDED PREPARATION
           ================================================= */

        setText(
            "decisionPreparation",
            currentPreparation
        );


        /* =================================================
           DEMAND VS PREPARATION
           ================================================= */

        updateDemandPreparation(
            currentDemand,
            currentPreparation
        );


        /* =================================================
           DIGITAL TWIN
           ================================================= */

        updateDigitalTwin(
            currentPreparation
        );


        /* =================================================
           DECISION KPIs
           ================================================= */

        const surplus =
            Number(data.potential_surplus) ||
            Math.max(
                currentPreparation -
                currentDemand,
                0
            );

        const wasteCost =
            Number(data.potential_waste_cost) ||
            surplus * currentFoodCost;

        const moneySaved =
            Number(data.money_saved) || 0;

        const wasteReduction =
            Number(data.waste_reduction_percent) || 0;


        setText(
            "surplus",
            surplus
        );

        setText(
            "wasteCost",
            formatCurrency(wasteCost)
        );

        setText(
            "moneySaved",
            formatCurrency(moneySaved)
        );

        setText(
            "wasteReduction",
            wasteReduction + "%"
        );


        /* =================================================
           RISK
           ================================================= */

        const risk =
            String(
                data.risk_level || "LOW"
            ).toUpperCase();


        setText(
            "riskLevel",
            risk
        );

        setText(
            "riskText",
            getRiskDescription(risk)
        );

        updateRiskStyle(risk);

        updateRiskBar(risk);


        /* =================================================
           RECOMMENDATION
           ================================================= */

        setText(
            "recommendationText",
            data.recommendation ||
            getDefaultRecommendation(
                risk,
                currentPreparation,
                currentDemand
            )
        );


        /* =================================================
           WHY DEMAND
           ================================================= */

        setText(
            "whyDemand",
            currentDemand
        );


        /* =================================================
           SHOW RESULTS
           ================================================= */

        if (results) {
            results.style.display = "block";
            results.style.opacity = "1";
        }


        console.log(
            "Simulation completed successfully."
        );


    } catch (error) {

        console.error(
            "Simulation error:",
            error
        );

        alert(
            "Simulation failed.\n\n" +
            error.message
        );

    } finally {

        if (loading) {
            loading.style.display = "none";
        }

        if (results) {
            results.style.opacity = "1";
        }
    }
}


/* =========================================================
   SAFE TEXT UPDATE
   ========================================================= */

function setText(id, value) {

    const element =
        document.getElementById(id);

    if (!element) {

        console.warn(
            "HTML element not found:",
            "#" + id
        );

        return;
    }

    element.textContent = value;
}


/* =========================================================
   DEMAND VS PREPARATION
   ========================================================= */

function updateDemandPreparation(
    demand,
    preparation
) {

    setText(
        "demandBarValue",
        demand + " meals"
    );

    setText(
        "preparationBarValue",
        preparation + " meals"
    );


    const demandBar =
        document.getElementById(
            "demandBar"
        );

    const preparationBar =
        document.getElementById(
            "preparationBar"
        );


    const maxValue =
        Math.max(
            demand,
            preparation,
            1
        );


    if (demandBar) {

        setTimeout(() => {

            demandBar.style.width =
                ((demand / maxValue) * 100) +
                "%";

        }, 100);
    }


    if (preparationBar) {

        setTimeout(() => {

            preparationBar.style.width =
                ((preparation / maxValue) * 100) +
                "%";

        }, 150);
    }


    const buffer =
        Math.max(
            preparation - demand,
            0
        );


    setText(
        "safetyBuffer",
        "AI safety buffer: +" +
        buffer +
        " meals"
    );
}


/* =========================================================
   DIGITAL TWIN
   ========================================================= */

function updateDigitalTwin(
    preparation
) {

    const slider =
        document.getElementById(
            "scenarioSlider"
        );


    /*
       Slider exists:
       Set it to AI recommended preparation.
    */

    if (slider) {

        slider.value =
            preparation;
    }


    /*
       Even if slider is missing,
       scenario calculation should continue.
    */

    updateScenario(
        preparation
    );
}


/* =========================================================
   SCENARIO SLIDER
   ========================================================= */

function updateScenario(
    meals
) {

    meals = Number(meals);


    if (!Number.isFinite(meals)) {
        return;
    }


    /* =====================================================
       IMPORTANT FIX
       ===================================================== */

    /*
       The old code used:

       slider?.min
       slider?.max

       but slider was NOT declared inside this function.

       Now we explicitly get the slider here.
    */

    const slider =
        document.getElementById(
            "scenarioSlider"
        );


    /* =====================================================
       CURRENT DEMAND & COST
       ===================================================== */

    const demand =
        currentDemand || 495;

    const cost =
        currentFoodCost || 60;


    /* =====================================================
       VISIBLE VALUES
       ===================================================== */

    setText(
        "sliderValue",
        meals
    );

    setText(
        "scenarioMealNumber",
        meals
    );

    setText(
        "preparedMeals",
        meals
    );

    setText(
        "twinDemand",
        demand
    );


    /* =====================================================
       DIFFERENCE
       ===================================================== */

    const difference =
        meals - demand;


    setText(
        "scenarioDifference",
        difference >= 0
            ? "+" + difference
            : difference
    );


    /* =====================================================
       SURPLUS / WASTE
       ===================================================== */

    const surplus =
        Math.max(
            difference,
            0
        );


    setText(
        "scenarioWaste",
        surplus
    );


    /* =====================================================
       WASTE COST
       ===================================================== */

    const scenarioCost =
        surplus * cost;


    setText(
        "scenarioCost",
        formatCurrency(
            scenarioCost
        )
    );


    /* =====================================================
       SCENARIO STATUS
       ===================================================== */

    let status =
        "BALANCED";


    if (difference <= -20) {

        status =
            "SHORTAGE";

    } else if (difference >= 20) {

        status =
            "SURPLUS";
    }


    /* Main scenario result */

    setText(
        "scenarioStatus",
        status
    );


    /* Digital Twin node */

    setText(
        "twinScenarioStatus",
        status
    );


    /* =====================================================
       STATUS DOT
       ===================================================== */

    const dot =
        document.getElementById(
            "scenarioStatusDot"
        );


    if (dot) {

        dot.classList.remove(
            "status-low",
            "status-medium",
            "status-high"
        );


        if (status === "SHORTAGE") {

            dot.classList.add(
                "status-high"
            );

        } else if (status === "SURPLUS") {

            dot.classList.add(
                "status-medium"
            );

        } else {

            dot.classList.add(
                "status-low"
            );
        }
    }


    /* =====================================================
       SCENARIO BUTTONS
       ===================================================== */

    document
        .querySelectorAll(
            ".scenario-btn"
        )
        .forEach(button => {

            const buttonMeals =
                Number(
                    button.dataset.meals
                );

            button.classList.toggle(
                "active",
                buttonMeals === meals
            );
        });


    /* =====================================================
       SLIDER VISUAL
       ===================================================== */

    if (slider) {

        const min =
            Number(slider.min) || 400;

        const max =
            Number(slider.max) || 600;


        let percentage =
            ((meals - min) /
            (max - min)) * 100;


        /*
           Keep percentage between 0 and 100
        */

        percentage =
            Math.max(
                0,
                Math.min(
                    100,
                    percentage
                )
            );


        slider.style.background =
            `linear-gradient(
                90deg,
                #18a85f 0%,
                #18a85f ${percentage}%,
                #dceae2 ${percentage}%,
                #dceae2 100%
            )`;
    }


    /* =====================================================
       EXTRA DIGITAL TWIN VISUALS
       ===================================================== */

    updateScenarioVisuals(
        status,
        difference
    );
}


/* =========================================================
   DIGITAL TWIN VISUAL STATE
   ========================================================= */

function updateScenarioVisuals(
    status,
    difference = 0
) {

    const statusElement =
        document.getElementById(
            "scenarioStatus"
        );


    if (statusElement) {

        statusElement.classList.remove(
            "status-balanced",
            "status-shortage",
            "status-surplus"
        );


        if (status === "SHORTAGE") {

            statusElement.classList.add(
                "status-shortage"
            );

        } else if (status === "SURPLUS") {

            statusElement.classList.add(
                "status-surplus"
            );

        } else {

            statusElement.classList.add(
                "status-balanced"
            );
        }
    }


    const twinStatus =
        document.getElementById(
            "twinScenarioStatus"
        );


    if (twinStatus) {

        twinStatus.classList.remove(
            "status-balanced",
            "status-shortage",
            "status-surplus"
        );


        if (status === "SHORTAGE") {

            twinStatus.classList.add(
                "status-shortage"
            );

        } else if (status === "SURPLUS") {

            twinStatus.classList.add(
                "status-surplus"
            );

        } else {

            twinStatus.classList.add(
                "status-balanced"
            );
        }
    }
}


/* =========================================================
   SCENARIO BUTTONS
   ========================================================= */

function selectScenario(
    meals
) {

    const slider =
        document.getElementById(
            "scenarioSlider"
        );


    if (slider) {

        slider.value =
            meals;
    }


    updateScenario(
        meals
    );
}


/* =========================================================
   RISK STYLE
   ========================================================= */

function updateRiskStyle(
    risk
) {

    const riskElement =
        document.getElementById(
            "riskLevel"
        );


    if (!riskElement) {
        return;
    }


    riskElement.classList.remove(
        "risk-low",
        "risk-medium",
        "risk-high"
    );


    switch (
        String(risk).toUpperCase()
    ) {

        case "LOW":

            riskElement.classList.add(
                "risk-low"
            );

            break;


        case "MEDIUM":

            riskElement.classList.add(
                "risk-medium"
            );

            break;


        case "HIGH":

            riskElement.classList.add(
                "risk-high"
            );

            break;
    }
}


/* =========================================================
   RISK BAR
   ========================================================= */

function updateRiskBar(
    risk
) {

    const riskBar =
        document.getElementById(
            "riskBar"
        );


    if (!riskBar) {
        return;
    }


    let percentage =
        25;


    switch (
        String(risk).toUpperCase()
    ) {

        case "LOW":
            percentage = 25;
            break;

        case "MEDIUM":
            percentage = 55;
            break;

        case "HIGH":
            percentage = 85;
            break;
    }


    setTimeout(() => {

        riskBar.style.width =
            percentage + "%";

    }, 150);
}


/* =========================================================
   RISK DESCRIPTION
   ========================================================= */

function getRiskDescription(
    risk
) {

    switch (
        String(risk).toUpperCase()
    ) {

        case "LOW":

            return "Low food-waste risk";


        case "MEDIUM":

            return "Moderate food-waste risk";


        case "HIGH":

            return "High food-waste risk";


        default:

            return "Risk assessment available";
    }
}


/* =========================================================
   DEFAULT RECOMMENDATION
   ========================================================= */

function getDefaultRecommendation(
    risk,
    preparation,
    demand
) {

    if (risk === "HIGH") {

        return (
            "Reduce preparation closer to predicted demand " +
            "to minimize surplus and food waste."
        );
    }


    if (risk === "MEDIUM") {

        return (
            "Use the Digital Twin scenario to balance " +
            "demand, safety buffer and waste cost."
        );
    }


    return (
        "Maintain the AI recommended preparation level " +
        "for a balanced demand-to-preparation plan."
    );
}


/* =========================================================
   CURRENCY FORMATTER
   ========================================================= */

function formatCurrency(
    value
) {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {

        return "₹0";
    }


    const number =
        Number(value);


    if (!Number.isFinite(number)) {

        return "₹0";
    }


    return (
        "₹" +
        number.toLocaleString(
            "en-IN",
            {
                maximumFractionDigits: 0
            }
        )
    );
}


/* =========================================================
   ANIMATED NUMBER
   ========================================================= */

function animateNumber(
    elementId,
    finalValue,
    duration = 700
) {

    const element =
        document.getElementById(
            elementId
        );


    if (!element) {
        return;
    }


    const target =
        Number(finalValue);


    if (!Number.isFinite(target)) {

        element.textContent =
            finalValue;

        return;
    }


    const startTime =
        performance.now();


    function animate(
        currentTime
    ) {

        const elapsed =
            currentTime -
            startTime;


        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        const current =
            Math.round(
                target * eased
            );


        element.textContent =
            current;


        if (progress < 1) {

            requestAnimationFrame(
                animate
            );

            return;
        }


        element.textContent =
            target;
    }


    requestAnimationFrame(
        animate
    );
}


/* =========================================================
   INITIAL DIGITAL TWIN SETUP
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const slider =
            document.getElementById(
                "scenarioSlider"
            );


        /*
           Slider movement
        */

        if (slider) {

            slider.addEventListener(
                "input",
                () => {

                    updateScenario(
                        Number(slider.value)
                    );
                }
            );
        }


        /*
           Scenario buttons
        */

        document
            .querySelectorAll(
                ".scenario-btn"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const meals =
                            Number(
                                button.dataset.meals
                            );

                        selectScenario(
                            meals
                        );
                    }
                );
            });


        /*
           Initial Digital Twin state
        */

        if (slider) {

            updateScenario(
                Number(slider.value)
            );
        }

    }
);

