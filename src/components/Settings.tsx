import React, { useState } from 'react';
import { Bell, Shield, Car, User, Sliders, Gauge } from 'lucide-react';

export default function Settings() {
  const [notifications, setNotifications] = useState({
    maintenance: true,
    performance: true,
    security: false,
  });

  const [preferences, setPreferences] = useState({
    units: 'imperial',
    theme: 'light',
    language: 'en',
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Settings */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="w-10 h-10 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">John Doe</h2>
            <p className="text-gray-600">john.doe@example.com</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            Edit Profile
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            Change Password
          </button>
        </div>
      </div>

      {/* Vehicle Settings */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Car className="w-6 h-6 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Vehicle Settings</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Gauge className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Performance Monitoring</p>
                <p className="text-sm text-gray-600">Adjust engine monitoring parameters</p>
              </div>
            </div>
            <button className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Configure
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Sliders className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Maintenance Schedule</p>
                <p className="text-sm text-gray-600">Set service intervals and reminders</p>
              </div>
            </div>
            <button className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Adjust
            </button>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Bell className="w-6 h-6 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
        </div>

        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                  {key === 'maintenance' && <Sliders className="w-5 h-5 text-gray-600" />}
                  {key === 'performance' && <Activity className="w-5 h-5 text-gray-600" />}
                  {key === 'security' && <Shield className="w-5 h-5 text-gray-600" />}
                </div>
                <div>
                  <p className="font-medium text-gray-900 capitalize">{key} Alerts</p>
                  <p className="text-sm text-gray-600">
                    Receive notifications about {key} updates
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={value}
                  onChange={() => 
                    setNotifications(prev => ({
                      ...prev,
                      [key]: !prev[key]
                    }))
                  }
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Sliders className="w-6 h-6 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Preferences</h2>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Units
              </label>
              <select
                value={preferences.units}
                onChange={(e) => setPreferences(prev => ({ ...prev, units: e.target.value }))}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="imperial">Imperial (mph, mi)</option>
                <option value="metric">Metric (km/h, km)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Language
              </label>
              <select
                value={preferences.language}
                onChange={(e) => setPreferences(prev => ({ ...prev, language: e.target.value }))}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}