import React from 'react';
import { Car, Settings, LogOut, History, LayoutDashboard } from 'lucide-react';

interface HeaderProps {
  onLogout: () => void;
  currentPage: string;
  onPageChange: (page: 'dashboard' | 'history' | 'settings') => void;
}

export default function Header({ onLogout, currentPage, onPageChange }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Car className="w-8 h-8 text-blue-600" />
            <h1 className="text-xl font-semibold text-gray-900">Vehicle Health Monitor</h1>
          </div>
          
          <nav className="flex items-center space-x-2">
            <button 
              onClick={() => onPageChange('dashboard')}
              className={`flex items-center space-x-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'dashboard'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button 
              onClick={() => onPageChange('history')}
              className={`flex items-center space-x-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'history'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <History className="w-4 h-4" />
              <span>History</span>
            </button>

            <button 
              onClick={() => onPageChange('settings')}
              className={`flex items-center space-x-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'settings'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>

            <div className="h-6 w-px bg-gray-200 mx-2" />

            <button 
              onClick={onLogout}
              className="flex items-center space-x-1 px-4 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}