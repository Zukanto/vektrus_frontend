import React from 'react';
import { ChevronDown } from 'lucide-react';

const clients = [
  {
    id: 1,
    name: 'TechInnovate Solutions',
    initial: 'T',
    color: 'bg-blue-500'
  },
  {
    id: 2,
    name: 'Vektrus',
    initial: 'V',
    color: 'bg-green-500'
  }
];

export default function ClientList() {
  return (
    <div className="px-4">
      <div className="space-y-1">
        {clients.map((client) => (
          <div key={client.id} className="group">
            <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 ${client.color} rounded-lg flex items-center justify-center`}>
                  <span className="text-white text-sm font-medium">{client.initial}</span>
                </div>
                <span>{client.name}</span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}