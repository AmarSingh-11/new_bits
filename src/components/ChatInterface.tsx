import React, { useState, useEffect, useRef } from 'react';
import { Mic, Send, X, MicOff } from 'lucide-react';
import { useVehicleData } from '../hooks/useVehicleData';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function ChatInterface({ onClose }: { onClose: () => void }) {
  const { currentData, RANGES } = useVehicleData();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your vehicle health assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        handleUserInput(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognition);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleUserInput = (text: string) => {
    const userMessage: Message = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    
    setTimeout(() => {
      const response = generateBotResponse(text.toLowerCase());
      const botMessage: Message = {
        id: Date.now() + 1,
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setMessage('');
  };

  const getStatusDescription = (value: number, range: { min: number; max: number; optimal: number }, unit: string) => {
    const percentage = ((value - range.min) / (range.max - range.min)) * 100;
    if (Math.abs(value - range.optimal) <= (range.max - range.min) * 0.1) {
      return `optimal (${value}${unit})`;
    } else if (percentage > 75) {
      return `high (${value}${unit})`;
    } else if (percentage < 25) {
      return `low (${value}${unit})`;
    }
    return `normal (${value}${unit})`;
  };

  const generateBotResponse = (input: string): string => {
    // Overall status
    if (input.includes('status')) {
      const engineStatus = getStatusDescription(currentData.engineSpeed, RANGES.engineSpeed, ' RPM');
      const tempStatus = getStatusDescription(currentData.engineTemp, RANGES.engineTemp, '°F');
      return `Current vehicle status:\n• Engine speed is ${engineStatus}\n• Engine temperature is ${tempStatus}\n• Overall engine health is at ${currentData.engineHealth.toFixed(1)}%`;
    }

    // Engine specific
    if (input.includes('engine')) {
      if (input.includes('speed')) {
        return `Engine speed is currently ${currentData.engineSpeed} RPM, which is ${
          getStatusDescription(currentData.engineSpeed, RANGES.engineSpeed, ' RPM')
        }. ${
          currentData.engineSpeed > RANGES.engineSpeed.optimal + 1000 
            ? 'Consider shifting to a higher gear to reduce engine stress.'
            : 'The engine is running smoothly.'
        }`;
      }
      if (input.includes('temp') || input.includes('temperature')) {
        return `Engine temperature is ${currentData.engineTemp}°F, which is ${
          getStatusDescription(currentData.engineTemp, RANGES.engineTemp, '°F')
        }. ${
          currentData.engineTemp > RANGES.engineTemp.optimal + 20
            ? 'Consider checking the coolant level and radiator condition.'
            : 'Temperature is within safe operating range.'
        }`;
      }
      return `Engine health is at ${currentData.engineHealth.toFixed(1)}%. ${
        currentData.engineHealth > 90 
          ? 'All systems are functioning optimally.'
          : 'Regular maintenance is recommended to maintain peak performance.'
      }`;
    }

    // Battery status
    if (input.includes('battery')) {
      return `Battery voltage is ${currentData.batteryVoltage}V, which is ${
        getStatusDescription(currentData.batteryVoltage, RANGES.batteryVoltage, 'V')
      }. ${
        currentData.batteryVoltage < RANGES.batteryVoltage.optimal - 0.5
          ? 'Consider checking the charging system.'
          : 'The charging system is working properly.'
      }`;
    }

    // Fuel efficiency
    if (input.includes('fuel') || input.includes('gas') || input.includes('mileage')) {
      return `Current fuel efficiency is ${currentData.fuelEfficiency.toFixed(1)} MPG, which is ${
        getStatusDescription(currentData.fuelEfficiency, RANGES.fuelEfficiency, ' MPG')
      }. ${
        currentData.fuelEfficiency < RANGES.fuelEfficiency.optimal - 5
          ? 'Tips to improve: Check tire pressure, avoid rapid acceleration, and remove excess weight.'
          : 'Your driving habits are helping to maximize fuel efficiency.'
      }`;
    }

    // Oil level
    if (input.includes('oil')) {
      return `Oil level is at ${currentData.oilLevel}%, which is ${
        getStatusDescription(currentData.oilLevel, RANGES.oilLevel, '%')
      }. ${
        currentData.oilLevel < RANGES.oilLevel.optimal - 20
          ? 'Schedule an oil change soon to maintain engine health.'
          : 'Oil level is sufficient for safe operation.'
      }`;
    }

    // Next service
    if (input.includes('service') || input.includes('maintenance')) {
      const days = Math.ceil(currentData.mileageToService / 100);
      return `Next service is due in ${currentData.mileageToService.toLocaleString()} miles (approximately ${days} days). ${
        currentData.mileageToService < 1000
          ? 'Schedule your service appointment soon to maintain vehicle health.'
          : 'You have plenty of time before the next required service.'
      }`;
    }

    return "I can help you with information about:\n• Vehicle status\n• Engine speed and temperature\n• Battery health\n• Fuel efficiency\n• Oil level\n• Maintenance schedule\n\nWhat would you like to know?";
  };

  const toggleVoiceRecognition = () => {
    if (isListening) {
      recognition?.stop();
    } else {
      recognition?.start();
    }
    setIsListening(!isListening);
  };

  return (
    <div className="fixed bottom-24 right-6 w-96 bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=64&h=64&fit=crop&crop=faces"
              alt="AI Assistant"
              className="w-10 h-10 rounded-full"
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Vehicle Assistant</h3>
            <p className="text-xs text-gray-500">Always here to help</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="h-96 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 mr-2">
                  <img
                    src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=32&h=32&fit=crop&crop=faces"
                    alt="AI Assistant"
                    className="w-8 h-8 rounded-full"
                  />
                </div>
              )}
              <div
                className={`rounded-lg p-3 max-w-[80%] ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="text-sm whitespace-pre-line">{msg.text}</p>
                <p className="text-xs mt-1 opacity-70">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleVoiceRecognition}
            className={`p-2 rounded-full ${
              isListening
                ? 'text-red-600 hover:text-red-700 bg-red-50'
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
            }`}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
          
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && message.trim()) {
                handleUserInput(message);
              }
            }}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <button
            onClick={() => message.trim() && handleUserInput(message)}
            className="p-2 text-blue-600 hover:text-blue-700 rounded-full hover:bg-blue-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}