import { useState, useEffect } from 'react';
import { Bell, CheckCircle2, Clock, Plus, RefreshCw } from 'lucide-react';
import { checkBackendHealth } from './services/apiClient';
import type { Reminder, Priority } from './types/reminder';

const INITIAL_REMINDERS: Reminder[] = [
  {
    id: 1,
    title: 'Initialize React Frontend with Vite & Docker',
    description: 'Setup Vite + React + TypeScript and create Docker container.',
    dueDate: 'Today, 5:00 PM',
    priority: 'HIGH',
    completed: true,
    category: 'Development',
  },
  {
    id: 2,
    title: 'Verify Docker Compose Bridge Network',
    description: 'Ensure communication between React frontend and Spring Boot API.',
    dueDate: 'Tomorrow, 10:00 AM',
    priority: 'MEDIUM',
    completed: false,
    category: 'DevOps',
  },
];

export function App() {
  const [reminders, setReminders] = useState<Reminder[]>(INITIAL_REMINDERS);
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState<Priority>('MEDIUM');
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

  const toggleComplete = (id: number) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r))
    );
  };

  const addReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: Reminder = {
      id: Date.now(),
      title: newTitle.trim(),
      dueDate: 'Scheduled',
      priority: newPriority,
      completed: false,
      category: 'General',
    };

    setReminders([newItem, ...reminders]);
    setNewTitle('');
  };

  const priorityColor = (p: Priority) => {
    switch (p) {
      case 'HIGH':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'MEDIUM':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'LOW':
        return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">Reminder Application</h1>
            <p className="text-xs text-slate-400">Frontend Containerized Environment (Vite + React)</p>
          </div>
        </div>

        {/* Backend Connectivity Indicator */}
        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                backendStatus.connected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
              }`}
            />
            <span className="text-slate-300 font-medium">
              API: {backendStatus.connected ? 'Connected' : 'Standby / Offline'}
            </span>
          </div>
          <button
            onClick={checkStatus}
            title="Retry Backend Ping"
            className="text-slate-400 hover:text-slate-200 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${checking ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-3xl w-full mx-auto p-6 flex-1 flex flex-col gap-6">
        {/* Info Banner */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
          <Clock className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" />
          <div className="text-xs text-slate-300 space-y-1">
            <p className="font-semibold text-slate-100">Live Hot-Reload Development Active</p>
            <p>
              Target API Base URL: <code className="bg-slate-800 px-1.5 py-0.5 rounded text-indigo-300">{import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1'}</code>
            </p>
          </div>
        </div>

        {/* New Reminder Form */}
        <form onSubmit={addReminder} className="flex gap-2">
          <input
            type="text"
            placeholder="Add a new reminder..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
          <select
            value={newPriority}
            onChange={(e) => setNewPriority(e.target.value as Priority)}
            aria-label="Reminder priority"
            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
          <button
            type="submit"
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2.5 rounded-lg text-sm transition-colors shadow-lg shadow-indigo-600/20"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </form>

        {/* Reminders List */}
        <section className="space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
            <span>Reminders ({reminders.length})</span>
            <span>
              {reminders.filter((r) => r.completed).length} of {reminders.length} Done
            </span>
          </div>

          <div className="space-y-2">
            {reminders.map((reminder) => (
              <div
                key={reminder.id}
                onClick={() => toggleComplete(reminder.id)}
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                  reminder.completed
                    ? 'bg-slate-900/40 border-slate-800/60 opacity-60'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <button className="text-slate-400 hover:text-indigo-400 transition-colors">
                    {reminder.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-slate-600 hover:border-indigo-400" />
                    )}
                  </button>
                  <div>
                    <h4
                      className={`text-sm font-medium ${
                        reminder.completed ? 'line-through text-slate-500' : 'text-slate-100'
                      }`}
                    >
                      {reminder.title}
                    </h4>
                    {reminder.description && (
                      <p className="text-xs text-slate-400 mt-0.5">{reminder.description}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${priorityColor(
                      reminder.priority
                    )}`}
                  >
                    {reminder.priority}
                  </span>
                  <span className="text-xs text-slate-500">{reminder.dueDate}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 px-6 py-4 text-center text-xs text-slate-500">
        Reminder Application &bull; Issue #3 Workspace &bull; Developed by @VishwaAdhesh
      </footer>
    </div>
  );
}

export default App;
