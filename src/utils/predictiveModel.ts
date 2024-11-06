import { VehicleData } from '../types/vehicle';

class PredictiveModel {
  private readonly TEMP_THRESHOLD = 220;
  private readonly OIL_THRESHOLD = 70;
  private readonly BATTERY_THRESHOLD = 12.0;
  private readonly ENGINE_SPEED_THRESHOLD = 3000;

  predictMaintenanceNeeds(currentData: VehicleData, historicalData: VehicleData[]): Alert[] {
    const alerts: Alert[] = [];
    
    // Predict oil change needs
    if (this.predictOilDegradation(currentData.oilLevel, historicalData)) {
      alerts.push({
        id: Date.now(),
        title: 'Oil Change Required',
        description: 'Oil quality degrading faster than normal',
        priority: 'high',
        dueDate: '3 days',
      });
    }

    // Predict engine health issues
    if (this.predictEngineIssues(currentData, historicalData)) {
      alerts.push({
        id: Date.now() + 1,
        title: 'Engine Inspection Needed',
        description: 'Unusual engine performance patterns detected',
        priority: 'medium',
        dueDate: '1 week',
      });
    }

    // Battery health prediction
    if (this.predictBatteryFailure(currentData.batteryVoltage, historicalData)) {
      alerts.push({
        id: Date.now() + 2,
        title: 'Battery Warning',
        description: 'Battery showing signs of deterioration',
        priority: 'low',
        dueDate: '2 weeks',
      });
    }

    return alerts;
  }

  private predictOilDegradation(currentLevel: number, history: VehicleData[]): boolean {
    const degradationRate = history.length > 0 
      ? (history[0].oilLevel - currentLevel) / history.length 
      : 0;
    return currentLevel < this.OIL_THRESHOLD || degradationRate > 0.5;
  }

  private predictEngineIssues(current: VehicleData, history: VehicleData[]): boolean {
    return current.engineTemp > this.TEMP_THRESHOLD || 
           current.engineSpeed > this.ENGINE_SPEED_THRESHOLD;
  }

  private predictBatteryFailure(voltage: number, history: VehicleData[]): boolean {
    return voltage < this.BATTERY_THRESHOLD;
  }

  getHealthStatus(data: VehicleData): HealthStatus {
    if (data.engineTemp > this.TEMP_THRESHOLD || data.oilLevel < this.OIL_THRESHOLD) {
      return { status: 'Critical', color: 'text-red-600' };
    }
    if (data.engineSpeed > this.ENGINE_SPEED_THRESHOLD || data.batteryVoltage < this.BATTERY_THRESHOLD) {
      return { status: 'Warning', color: 'text-yellow-600' };
    }
    return { status: 'Normal', color: 'text-green-600' };
  }
}

export const predictiveModel = new PredictiveModel();