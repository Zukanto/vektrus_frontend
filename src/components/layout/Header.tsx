import React from 'react';
import { ArrowLeft, Search } from 'lucide-react';


export default function Header() {
  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="px-6 py-4">
        <div className="flex items-center justify-end">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Suche..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-vektrus-purple focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}