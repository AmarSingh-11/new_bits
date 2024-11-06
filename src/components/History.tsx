import React from 'react';
import { VehicleData } from '../types/vehicle';
import { Calendar, Clock, Activity } from 'lucide-react';

interface HistoryProps {
  historicalData: VehicleData[];
}

export default function History({ historicalData }: HistoryProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Vehicle History</h2>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Today
            </button>
            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200">
              Week
            </button>
            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200">
              Month
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {historicalData.map((data, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      {new Date(Date.now() - index * 2000).toLocaleTimeString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(Date.now() - index * 2000).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">Engine Health</p>
                    <p className={`text-sm ${
                      data.engineHealth > 90 ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {data.engineHealth.toFixed(1)}%
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">Efficiency</p>
                    <p className="text-sm text-blue-600">
                      {data.fuelEfficiency.toFixed(1)} MPG
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-3 rounded-md">
                  <p className="text-xs text-gray-600">Engine Speed</p>
                  <p className="font-medium">{data.engineSpeed.toLocaleString()} RPM</p>
                </div>
                <div className="bg-white p-3 rounded-md">
                  <p className="text-xs text-gray-600">Temperature</p>
                  <p className="font-medium">{data.engineTemp}°F</p>
                </div>
                <div className="bg-white p-3 rounded-md">
                  <p className="text-xs text-gray-600">Battery</p>
                  <p className="font-medium">{data.batteryVoltage}V</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}