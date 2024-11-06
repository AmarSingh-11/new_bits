export interface VehicleData {
  engineSpeed: number;
  engineTemp: number;
  oilLevel: number;
  batteryVoltage: number;
  fuelEfficiency: number;
  engineHealth: number;
  mileageToService: number;
}

export interface Alert {
  id: number;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
}

export interface HealthStatus {
  status: 'Normal' | 'Warning' | 'Critical';
  color: string;
}