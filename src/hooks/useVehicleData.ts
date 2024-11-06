import { useState, useEffect } from 'react';
import { VehicleData, Alert } from '../types/vehicle';
import { predictiveModel } from '../utils/predictiveModel';

// Realistic ranges for vehicle data with more variation
const RANGES = {
  engineSpeed: { min: 700, max: 6500, optimal: 2500 },
  engineTemp: { min: 170, max: 230, optimal: 195 },
  oilLevel: { min: 20, max: 100, optimal: 80 },
  batteryVoltage: { min: 11.8, max: 14.4, optimal: 12.6 },
  fuelEfficiency: { min: 15, max: 45, optimal: 30 },
  engineHealth: { min: 0, max: 100, optimal: 95 },
  mileageToService: { min: 0, max: 5000, optimal: 3000 }
};

const generateRealisticData = (): VehicleData => {
  const now = Date.now();
  // Multiple oscillations with different frequencies for more realistic variation
  const timeOffset1 = Math.sin(now / 10000); // Slow oscillation
  const timeOffset2 = Math.sin(now / 5000);  // Medium oscillation
  const timeOffset3 = Math.sin(now / 2000);  // Fast oscillation
  
  // Random factor for additional variation
  const randomFactor = Math.random() * 0.3;

  // Combine oscillations with different weights
  const combinedOffset = (timeOffset1 * 0.5 + timeOffset2 * 0.3 + timeOffset3 * 0.2) * (1 + randomFactor);

  return {
    engineSpeed: Math.floor(RANGES.engineSpeed.optimal + combinedOffset * 1000),
    engineTemp: Math.floor(RANGES.engineTemp.optimal + combinedOffset * 25),
    oilLevel: Math.floor(RANGES.oilLevel.optimal + combinedOffset * 10),
    batteryVoltage: Number((RANGES.batteryVoltage.optimal + combinedOffset * 0.5).toFixed(1)),
    fuelEfficiency: Number((RANGES.fuelEfficiency.optimal + combinedOffset * 5).toFixed(1)),
    engineHealth: Number((RANGES.engineHealth.optimal + combinedOffset * 3).toFixed(1)),
    mileageToService: Math.floor(RANGES.mileageToService.optimal + combinedOffset * 500)
  };
};

export const useVehicleData = () => {
  const [currentData, setCurrentData] = useState<VehicleData>(generateRealisticData());
  const [historicalData, setHistoricalData] = useState<VehicleData[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = generateRealisticData();
      
      setHistoricalData(prev => {
        const updated = [currentData, ...prev].slice(0, 20);
        return updated;
      });
      
      setCurrentData(newData);
      
      const predictedAlerts = predictiveModel.predictMaintenanceNeeds(newData, historicalData);
      setAlerts(predictedAlerts);
    }, 2000); // Update more frequently for more dynamic changes

    return () => clearInterval(interval);
  }, [currentData, historicalData]);

  return { currentData, historicalData, alerts, RANGES };
};