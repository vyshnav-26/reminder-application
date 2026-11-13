import { useState, useEffect } from 'react';
import { checkBackendHealth } from './services/apiClient';

export function App() {
  const [backendStatus, setBackendStatus] = useState<{ status: string; connected: boolean }>({
    status: 'Checking...',
    connected: false,
  });
  const [checking, setChecking] = useState(false);

  const checkStatus = async () => {
    setChecking(true);
    const result = await checkBackendHealth();
    setBackendStatus(result);
    setChecking(false);
  };

  useEffect(() => {
    checkStatus();
  }, []);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-slate-800 rounded-xl shadow-xl p-8 border border-slate-700 text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Reminder Application
          </h1>
          <p className="text-sm text-slate-400">
            Frontend Setup &bull; React + Vite + Tailwind CSS
          </p>
        </div>

        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/60 text-left space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Backend Status
            </span>
            <span
              className={`text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1.5 ${
                backendStatus.connected
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  backendStatus.connected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                }`}
              />
              {backendStatus.connected ? 'Connected' : 'Offline / Standby'}
            </span>
          </div>

          <div className="text-xs text-slate-300">
            <span className="text-slate-500">API URL:</span>{' '}
            <code className="text-indigo-400 font-mono">{apiBaseUrl}</code>
          </div>
        </div>

        <button
          onClick={checkStatus}
          disabled={checking}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium py-2.5 px-4 rounded-lg text-sm transition-colors cursor-pointer"
        >
          {checking ? 'Pinging Backend...' : 'Test Backend Connection'}
        </button>
      </div>
    </div>
  );
}

export default App;
