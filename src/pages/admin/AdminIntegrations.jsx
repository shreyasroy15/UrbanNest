import React, { useState, useEffect } from 'react';
import { Cpu, Send, RefreshCw, CheckCircle2, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';


export const AdminIntegrations = () => {
  const [queryWebhook, setQueryWebhook] = useState(import.meta.env.VITE_N8N_QUERY_WEBHOOK_URL || '');
  const [chatbotWebhook, setChatbotWebhook] = useState(import.meta.env.VITE_N8N_CHATBOT_URL || '');
  
  const [isTestingQuery, setIsTestingQuery] = useState(false);
  const [isTestingChatbot, setIsTestingChatbot] = useState(false);
  const [queryTestStatus, setQueryTestStatus] = useState(null); // 'success' | 'detail-error' | null
  const [chatbotTestStatus, setChatbotTestStatus] = useState(null);

  const [useMockTelemetry, setUseMockTelemetry] = useState(true);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Read saved endpoints or fallback
    const savedQuery = localStorage.getItem('urbannest_n8n_query_webhook') || queryWebhook;
    const savedChatbot = localStorage.getItem('urbannest_n8n_chatbot_webhook') || chatbotWebhook;
    setQueryWebhook(savedQuery);
    setChatbotWebhook(savedChatbot);

    // Initial mock telemetry logs
    setLogs([
      { id: 1, type: 'Query Webhook', method: 'POST', status: 200, latency: '240ms', timestamp: '5m ago', info: 'Inquiry from rahul_sharma@gmail.com' },
      { id: 2, type: 'Chatbot Intent', method: 'POST', status: 200, latency: '480ms', timestamp: '12m ago', info: 'Query resolved: "operational hours"' },
      { id: 3, type: 'Chatbot Intent', method: 'POST', status: 504, latency: '3500ms', timestamp: '42m ago', info: 'Service timeout fallback to fallback prompt' },
      { id: 4, type: 'Query Webhook', method: 'POST', status: 200, latency: '190ms', timestamp: '1h ago', info: 'Message registered: "wholesale inquiry"' }
    ]);
  }, []);

  const handleSaveEndpoints = (e) => {
    e.preventDefault();
    localStorage.setItem('urbannest_n8n_query_webhook', queryWebhook);
    localStorage.setItem('urbannest_n8n_chatbot_webhook', chatbotWebhook);
    
    // Dispatch custom event to notify public pages if in same window SPA context
    window.dispatchEvent(new Event('urbannest_webhooks_updated'));
    
    alert('Webhooks configuration applied. The chatbot and query forms will now route requests to these values.');
  };

  const handleTestQueryWebhook = async () => {
    setIsTestingQuery(true);
    setQueryTestStatus(null);
    
    try {
      if (!queryWebhook.startsWith('http://') && !queryWebhook.startsWith('https://')) {
        throw new Error('Invalid endpoint URL protocol.');
      }
      
      const res = await fetch(queryWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          test: true,
          name: 'UrbanNest Telemetry Connection Test',
          email: 'admin@urbannest.demo',
          message: 'If you receive this, your N8N Contact Query webhook is correctly connected!'
        })
      });

      if (res.ok) {
        setQueryTestStatus('success');
      } else {
        setQueryTestStatus('error');
      }
    } catch (err) {
      setQueryTestStatus('error');
    } finally {
      setIsTestingQuery(false);
    }
  };

  const handleTestChatbotWebhook = async () => {
    setIsTestingChatbot(true);
    setChatbotTestStatus(null);

    try {
      if (!chatbotWebhook.startsWith('http://') && !chatbotWebhook.startsWith('https://')) {
        throw new Error('Invalid endpoint URL protocol.');
      }

      const res = await fetch(chatbotWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          test: true,
          message: 'Connection Test payload',
          history: []
        })
      });

      if (res.ok) {
        setChatbotTestStatus('success');
      } else {
        setChatbotTestStatus('error');
      }
    } catch (err) {
      setChatbotTestStatus('error');
    } finally {
      setIsTestingChatbot(false);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header */}
      <div className="text-left">
        <h1 className="text-xl sm:text-2xl font-serif text-stone-900 dark:text-white font-semibold">
          N8N Telemetry Monitor
        </h1>
        <p className="text-xs text-stone-500 dark:text-stone-400 font-light mt-1">
          Monitor your customer queries and automated chatbot webhooks integrations.
        </p>
      </div>

      {(!queryWebhook || !chatbotWebhook) && (
        <div className="p-4 bg-amber-50/70 border border-amber-200/60 rounded-2.5xl flex gap-3 text-amber-900 items-start text-left">
          <AlertTriangle className="w-5 h-5 text-amber-705 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed font-light">
            <span className="font-semibold block text-amber-950 font-heading">Webhooks Disconnected</span>
            Some environment endpoints are currently blank. Define webhook URLs to sync queries with N8N pipelines, or toggle Mock Telemetry logic below.
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
        
        {/* Left Column: Form to manage urls */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-stone-850 p-6 rounded-2.5xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-750 dark:text-stone-200 flex items-center gap-1.5 font-heading">
              <Cpu className="w-4.5 h-4.5 text-orange-705" />
              Webhook Endpoints Configuration
            </h3>

            <form onSubmit={handleSaveEndpoints} className="space-y-5 font-light text-xs">
              
              {/* Query endpoint */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="query-webhook-input" className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 font-heading">
                    N8N Contact Form Query URL
                  </label>
                  
                  {queryWebhook && (
                    <button
                      type="button"
                      disabled={isTestingQuery}
                      onClick={handleTestQueryWebhook}
                      className="px-2 py-0.5 bg-orange-50 dark:bg-orange-950/20 text-orange-700 hover:text-orange-900 border border-orange-200 dark:border-orange-900/40 rounded-lg font-semibold font-heading uppercase text-[9px] cursor-pointer flex items-center gap-1"
                    >
                      {isTestingQuery ? <RefreshCw className="w-2.5 h-2.5 animate-spin" /> : <Send className="w-2.5 h-2.5" />}
                      Test connection
                    </button>
                  )}
                </div>

                <input
                  id="query-webhook-input"
                  type="text"
                  value={queryWebhook}
                  onChange={(e) => setQueryWebhook(e.target.value)}
                  placeholder="https://n8n.yourdomain.com/webhook/..."
                  className="w-full px-3 py-2.5 bg-stone-55 dark:bg-stone-900 border border-stone-200 dark:border-stone-750 rounded-xl focus:outline-none text-[11px] text-stone-705 dark:text-stone-200 font-mono"
                />

                {queryTestStatus === 'success' && (
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Webhook active. Connected successfully.
                  </span>
                )}
                {queryTestStatus === 'error' && (
                  <span className="text-[10px] text-red-500 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> connection test failed. verify webhook.
                  </span>
                )}
              </div>

              {/* Chatbot endpoint */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="chatbot-webhook-input" className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 font-heading">
                    N8N AI Chatbot Agent URL
                  </label>
                  
                  {chatbotWebhook && (
                    <button
                      type="button"
                      disabled={isTestingChatbot}
                      onClick={handleTestChatbotWebhook}
                      className="px-2 py-0.5 bg-orange-50 dark:bg-orange-950/20 text-orange-700 hover:text-orange-900 border border-orange-200 dark:border-orange-900/40 rounded-lg font-semibold font-heading uppercase text-[9px] cursor-pointer flex items-center gap-1"
                    >
                      {isTestingChatbot ? <RefreshCw className="w-2.5 h-2.5 animate-spin" /> : <Send className="w-2.5 h-2.5" />}
                      Test connection
                    </button>
                  )}
                </div>

                <input
                  id="chatbot-webhook-input"
                  type="text"
                  value={chatbotWebhook}
                  onChange={(e) => setChatbotWebhook(e.target.value)}
                  placeholder="https://n8n.yourdomain.com/webhook/..."
                  className="w-full px-3 py-2.5 bg-stone-55 dark:bg-stone-900 border border-stone-200 dark:border-stone-750 rounded-xl focus:outline-none text-[11px] text-stone-705 dark:text-stone-200 font-mono"
                />

                {chatbotTestStatus === 'success' && (
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Webhook active. Connected successfully.
                  </span>
                )}
                {chatbotTestStatus === 'error' && (
                  <span className="text-[10px] text-red-505 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> connection test failed. verify webhook.
                  </span>
                )}
              </div>

              <div className="pt-2 border-t border-stone-105 dark:border-stone-800">
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 dark:bg-orange-700 dark:hover:bg-orange-655 text-white font-semibold rounded-xl focus:outline-none cursor-pointer text-xs"
                >
                  Save Webhook Enpoints
                </button>
              </div>

            </form>
          </div>
        </div>

        {/* Right Columns: Telemetry Activity Logs */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-stone-850 p-6 rounded-2.5xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold uppercase tracking-wider text-stone-750 dark:text-stone-205 font-heading">
                Webhook Logs Feed
              </span>
              
              <span className="flex items-center gap-1 text-[9px] font-bold font-heading uppercase text-emerald-600">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Demo Listeners On
              </span>
            </div>

            <div className="space-y-3 font-light text-xs">
              {logs.map((log) => (
                <div 
                  key={log.id} 
                  className="p-3 bg-stone-50 dark:bg-stone-900 border border-stone-150 dark:border-stone-800/80 rounded-xl leading-relaxed text-left flex flex-col justify-between"
                >
                  <div className="flex justify-between items-center text-[10px] font-heading font-medium">
                    <span className="text-stone-800 dark:text-stone-300 font-semibold">{log.type}</span>
                    <span className={`px-1.5 py-0.5 rounded-md ${
                      log.status === 200 
                        ? 'bg-emerald-50 text-emerald-805 dark:bg-emerald-950/20 dark:text-emerald-400' 
                        : 'bg-red-55 text-red-700 dark:bg-red-950/20 dark:text-red-400'
                    }`}>
                      {log.status}
                    </span>
                  </div>

                  <p className="text-[10px] text-stone-550 dark:text-stone-400 mt-2 font-mono truncate">
                    {log.info}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-stone-150/40 dark:border-stone-800/50 flex justify-between text-[9px] text-stone-400 font-heading">
                    <span>{log.method}</span>
                    <span>{log.latency} • {log.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminIntegrations;
