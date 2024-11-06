import React from 'react';
import { AlertTriangle, Clock } from 'lucide-react';
import { Alert } from '../types/vehicle';

interface Props {
  alerts: Alert[];
}

export default function MaintenanceAlerts({ alerts }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Maintenance Alerts</h2>
        <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-lg ${
                alert.priority === 'high' 
                  ? 'bg-red-100' 
                  : alert.priority === 'medium'
                  ? 'bg-yellow-100'
                  : 'bg-blue-100'
              }`}>
                <AlertTriangle className={`w-5 h-5 ${
                  alert.priority === 'high'
                    ? 'text-red-600'
                    : alert.priority === 'medium'
                    ? 'text-yellow-600'
                    : 'text-blue-600'
                }`} />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{alert.title}</h3>
                <p className="text-sm text-gray-600">{alert.description}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-1" />
                {alert.dueDate}
              </div>
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
                Schedule
              </button>
            </div>
          </div>
        ))}
        {alerts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No maintenance alerts at this time
          </div>
        )}
      </div>
    </div>
  );
}