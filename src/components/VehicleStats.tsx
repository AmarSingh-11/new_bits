import React from 'react';
import { Gauge, Thermometer, Droplet, Battery } from 'lucide-react';
import { VehicleData } from '../types/vehicle';
import { predictiveModel } from '../utils/predictiveModel';

interface Props {
  data: VehicleData;
}

export default function VehicleStats({ data }: Props) {
  const engineStatus = predictiveModel.getHealthStatus(data);
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Status</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <Gauge className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Engine Speed</p>
              <p className="font-semibold">{data.engineSpeed.toLocaleString()} RPM</p>
            </div>
          </div>
          <div className={engineStatus.color}>{engineStatus.status}</div>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Thermometer className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Engine Temp</p>
              <p className="font-semibold">{data.engineTemp}°F</p>
            </div>
          </div>
          <div className={data.engineTemp > 220 ? 'text-red-600' : 'text-green-600'}>
            {data.engineTemp > 220 ? 'High' : 'Optimal'}
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-100 p-2 rounded-lg">
              <Droplet className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Oil Level</p>
              <p className="font-semibold">{data.oilLevel}%</p>
            </div>
          </div>
          <div className={data.oilLevel < 70 ? 'text-yellow-600' : 'text-green-600'}>
            {data.oilLevel < 70 ? 'Check Soon' : 'Good'}
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Battery className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Battery</p>
              <p className="font-semibold">{data.batteryVoltage.toFixed(1)}V</p>
            </div>
          </div>
          <div className={data.batteryVoltage < 12 ? 'text-yellow-600' : 'text-green-600'}>
            {data.batteryVoltage < 12 ? 'Check' : 'Good'}
          </div>
        </div>
      </div>
    </div>
  );
}