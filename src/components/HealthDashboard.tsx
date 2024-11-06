import React from 'react';
import { VehicleData } from '../types/vehicle';
import { Activity, Zap, Gauge, Thermometer } from 'lucide-react';

interface Props {
  data: VehicleData;
  historicalData: VehicleData[];
}

const getPerformanceLevel = (value: number, optimal: number, max: number) => {
  const percentage = (value / max) * 100;
  if (Math.abs(value - optimal) <= max * 0.1) return 'Optimal';
  if (percentage > 80) return 'High';
  if (percentage < 40) return 'Low';
  return 'Normal';
};

const getIndicatorColor = (level: string) => {
  switch (level) {
    case 'Optimal': return 'bg-green-500';
    case 'High': return 'bg-red-500';
    case 'Low': return 'bg-yellow-500';
    default: return 'bg-blue-500';
  }
};

export default function HealthDashboard({ data, historicalData }: Props) {
  const engineSpeedLevel = getPerformanceLevel(data.engineSpeed, 2500, 6500);
  const engineTempLevel = getPerformanceLevel(data.engineTemp, 195, 230);
  const engineHealthLevel = getPerformanceLevel(data.engineHealth, 95, 100);
  const fuelEfficiencyLevel = getPerformanceLevel(data.fuelEfficiency, 30, 45);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Real-Time Performance</h2>

      <div className="grid grid-cols-2 gap-6">
        {/* Engine Speed Gauge */}
        <div className="relative p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Gauge className="w-5 h-5 text-blue-600" />
              <h3 className="font-medium text-gray-900">Engine Speed</h3>
            </div>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              getIndicatorColor(engineSpeedLevel).replace('bg-', 'bg-opacity-20 text-').replace('-500', '-700')
            }`}>
              {engineSpeedLevel}
            </span>
          </div>
          <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`absolute top-0 left-0 h-full transition-all duration-500 ${getIndicatorColor(engineSpeedLevel)}`}
              style={{ width: `${(data.engineSpeed / 6500) * 100}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-sm text-gray-600">
            <span>0 RPM</span>
            <span className="font-medium">{data.engineSpeed.toLocaleString()} RPM</span>
            <span>6,500 RPM</span>
          </div>
        </div>

        {/* Engine Temperature */}
        <div className="relative p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Thermometer className="w-5 h-5 text-red-600" />
              <h3 className="font-medium text-gray-900">Engine Temperature</h3>
            </div>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              getIndicatorColor(engineTempLevel).replace('bg-', 'bg-opacity-20 text-').replace('-500', '-700')
            }`}>
              {engineTempLevel}
            </span>
          </div>
          <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`absolute top-0 left-0 h-full transition-all duration-500 ${getIndicatorColor(engineTempLevel)}`}
              style={{ width: `${((data.engineTemp - 170) / 60) * 100}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-sm text-gray-600">
            <span>170°F</span>
            <span className="font-medium">{data.engineTemp}°F</span>
            <span>230°F</span>
          </div>
        </div>

        {/* Engine Health */}
        <div className="relative p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-green-600" />
              <h3 className="font-medium text-gray-900">Engine Health</h3>
            </div>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              getIndicatorColor(engineHealthLevel).replace('bg-', 'bg-opacity-20 text-').replace('-500', '-700')
            }`}>
              {engineHealthLevel}
            </span>
          </div>
          <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`absolute top-0 left-0 h-full transition-all duration-500 ${getIndicatorColor(engineHealthLevel)}`}
              style={{ width: `${data.engineHealth}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-sm text-gray-600">
            <span>0%</span>
            <span className="font-medium">{data.engineHealth.toFixed(1)}%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Fuel Efficiency */}
        <div className="relative p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-yellow-600" />
              <h3 className="font-medium text-gray-900">Fuel Efficiency</h3>
            </div>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              getIndicatorColor(fuelEfficiencyLevel).replace('bg-', 'bg-opacity-20 text-').replace('-500', '-700')
            }`}>
              {fuelEfficiencyLevel}
            </span>
          </div>
          <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`absolute top-0 left-0 h-full transition-all duration-500 ${getIndicatorColor(fuelEfficiencyLevel)}`}
              style={{ width: `${(data.fuelEfficiency / 45) * 100}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-sm text-gray-600">
            <span>15 MPG</span>
            <span className="font-medium">{data.fuelEfficiency.toFixed(1)} MPG</span>
            <span>45 MPG</span>
          </div>
        </div>
      </div>
    </div>
  );
}