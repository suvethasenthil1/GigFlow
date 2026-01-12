import { useState } from 'react';
import api from '../services/api';

const TestConnection = () => {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const testBackend = async () => {
    setLoading(true);
    try {
      const response = await api.get('/test');
      setStatus(`✅ Backend: ${response.data.message}`);
    } catch (error) {
      setStatus(`❌ Backend Error: ${error.message}`);
    }
    setLoading(false);
  };

  const testDebug = async () => {
    setLoading(true);
    try {
      const response = await api.get('/debug');
      setStatus(`🔍 Debug: ${response.data.users} users, ${response.data.gigs} gigs`);
    } catch (error) {
      setStatus(`❌ Debug Error: ${error.message}`);
    }
    setLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border max-w-xs">
      <div className="flex flex-col space-y-2">
        <button
          onClick={testBackend}
          disabled={loading}
          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test API'}
        </button>
        <button
          onClick={testDebug}
          disabled={loading}
          className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 disabled:opacity-50"
        >
          Check DB
        </button>
      </div>
      {status && (
        <p className="mt-2 text-xs break-words">{status}</p>
      )}
    </div>
  );
};

export default TestConnection;