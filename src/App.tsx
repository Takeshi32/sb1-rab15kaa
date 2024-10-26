import React from 'react';
import { Cpu } from 'lucide-react';
import { ScanList } from './components/ScanList';
import { ErrorMessage } from './components/ErrorMessage';
import { useRFIDScans } from './hooks/useRFIDScans';

function App() {
  const { scans, error, loading } = useRFIDScans();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Cpu className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">RFID Scanner Dashboard</h1>
          <p className="mt-2 text-gray-600">Real-time RFID scan monitoring</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Scans</h2>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading scans...</p>
            </div>
          ) : error ? (
            <ErrorMessage message={error} />
          ) : scans.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No scans recorded yet</p>
          ) : (
            <ScanList scans={scans} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;