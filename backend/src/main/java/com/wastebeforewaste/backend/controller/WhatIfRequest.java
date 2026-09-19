package com.wastebeforewaste.backend.controller;

public class WhatIfRequest {

    private double temperature;
    private double rainfall;
    private boolean isHoliday;
    private boolean isWeekend;
    private String specialEvent;

    private int plannedMeals;
    private double foodCostPerMeal;

    public double getTemperature() {
        return temperature;
    }

    public void setTemperature(double temperature) {
        this.temperature = temperature;
    }

    public double getRainfall() {
        return rainfall;
    }

    public void setRainfall(double rainfall) {
        this.rainfall = rainfall;
    }

    public boolean getIsHoliday() {
        return isHoliday;
    }

    public void setIsHoliday(boolean isHoliday) {
        this.isHoliday = isHoliday;
    }

    public boolean getIsWeekend() {
        return isWeekend;
    }

    public void setIsWeekend(boolean isWeekend) {
        this.isWeekend = isWeekend;
    }

    public String getSpecialEvent() {
        return specialEvent;
    }

    public void setSpecialEvent(String specialEvent) {
        this.specialEvent = specialEvent;
    }

    public int getPlannedMeals() {
        return plannedMeals;
    }

    public void setPlannedMeals(int plannedMeals) {
        this.plannedMeals = plannedMeals;
    }

    public double getFoodCostPerMeal() {
        return foodCostPerMeal;
    }

    public void setFoodCostPerMeal(double foodCostPerMeal) {
        this.foodCostPerMeal = foodCostPerMeal;
    }
}