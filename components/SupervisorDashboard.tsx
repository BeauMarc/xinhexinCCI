import React, { useState, useEffect, useRef } from 'react';
import { CoachingTip } from '../types';
import { generateCoachingTip } from '../services/coachingService';

interface SupervisorDashboardProps {
  onExit: () => void;
}

const SupervisorDashboard: React.FC<SupervisorDashboardProps> = ({ onExit }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [tips, setTips] = useState<CoachingTip[]>([]);
  const [status, setStatus] = useState('Standby');
  const recognitionRef = useRef<any>(null);

  // Initialize Speech Recognition (Chrome only usually)
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US'; // Or 'zh-CN' based on requirement, default to English for demo consistency

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript + ' ';
          }
        }
        if (finalTranscript) {
          setTranscript(prev => (prev + finalTranscript).slice(-500)); // Keep last 500 chars context
          fetchTip(finalTranscript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech error", event.error);
        setStatus('Audio Error');
      };
    }
  }, []);

  const fetchTip = async (newText: string) => {
    const tip = await generateCoachingTip(newText);
    if (tip) {
      setTips(prev => [tip, ...prev].slice(0, 5)); // Keep latest 5 tips
    }
  };

  const toggleSession = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      setStatus('Standby');
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
      setStatus('Live Monitoring');
      setTips([]);
      setTranscript('');
      // Initial Tip
      setTips([{
        id: 'init',
        category: 'INFO',
        content: 'Greet firmly: "This is the Senior Manager of China Life Group Business."',
        priority: 'HIGH'
      }]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-mono flex flex-col">
      {/* Top Bar */}
      <div className="h-16 border-b border-slate-700 flex items-center justify-between px-6 bg-slate-950">
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
          <h1 className="font-bold text-lg tracking-wider text-red-500">SUPERVISOR OVERRIDE MODE</h1>
        </div>
        <div className="flex items-center gap-4">
           <span className="text-xs text-slate-500">SECURE CHANNEL: ENCRYPTED</span>
           <button onClick={onExit} className="px-4 py-1.5 border border-slate-600 rounded hover:bg-slate-800 text-xs">
             EXIT
           </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Left: Live Data & Transcript */}
        <div className="flex-1 p-6 flex flex-col border-r border-slate-800">
           <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-emerald-500 font-bold mb-1">CLIENT CONNECTION</h2>
                <div className="text-2xl font-light text-white">Speedy Logistics Group</div>
                <div className="text-sm text-slate-500">Policy: POL-8888 • VIP Tier 1</div>
              </div>
              <button 
                onClick={toggleSession}
                className={`w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all ${isListening ? 'border-red-500 bg-red-500/20 text-red-500 animate-pulse' : 'border-slate-600 text-slate-600 hover:border-emerald-500 hover:text-emerald-500'}`}
              >
                <i className={`fa-solid ${isListening ? 'fa-microphone' : 'fa-microphone-slash'} text-2xl`}></i>
              </button>
           </div>

           <div className="flex-1 bg-slate-950 rounded-xl p-4 border border-slate-800 relative overflow-hidden">
              <div className="absolute top-2 right-2 text-[10px] text-slate-600">LIVE TRANSCRIPT</div>
              <div className="h-full overflow-y-auto text-slate-300 font-sans leading-relaxed whitespace-pre-wrap">
                 {transcript || <span className="text-slate-700 italic">Waiting for audio stream...</span>}
              </div>
           </div>
        </div>

        {/* Right: AI Shadow Coach */}
        <div className="w-96 bg-slate-950 p-6 flex flex-col border-l border-slate-800">
          <div className="mb-6 flex items-center gap-2">
            <i className="fa-solid fa-brain text-purple-500"></i>
            <h3 className="font-bold text-purple-400">AI NEGOTIATION COACH</h3>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto">
            {tips.map((tip) => (
              <div key={tip.id} className={`p-4 rounded-lg border-l-4 shadow-lg animate-fade-in-up 
                ${tip.priority === 'HIGH' ? 'bg-red-900/20 border-red-500' : 'bg-slate-800 border-blue-500'}`}>
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded 
                    ${tip.category === 'TRUST' ? 'bg-emerald-900 text-emerald-400' : 
                      tip.category === 'RISK' ? 'bg-orange-900 text-orange-400' : 
                      'bg-blue-900 text-blue-400'}`}>
                    {tip.category}
                  </span>
                  {tip.priority === 'HIGH' && <i className="fa-solid fa-triangle-exclamation text-red-500 text-xs"></i>}
                </div>
                <p className="text-sm font-medium text-slate-200">
                  {tip.content}
                </p>
              </div>
            ))}
            
            {tips.length === 0 && (
              <div className="text-center text-slate-600 mt-20">
                <i className="fa-solid fa-wave-square text-4xl mb-4 opacity-20"></i>
                <p className="text-xs">AI is analyzing conversation patterns...</p>
              </div>
            )}
          </div>
          
          <div className="mt-6 pt-6 border-t border-slate-800">
             <div className="text-xs text-slate-500 mb-2">QUICK ACTIONS</div>
             <div className="grid grid-cols-2 gap-2">
                <button className="bg-slate-800 hover:bg-slate-700 py-2 rounded text-xs text-slate-300 transition-colors">Verify Policy</button>
                <button className="bg-slate-800 hover:bg-slate-700 py-2 rounded text-xs text-slate-300 transition-colors">Send Contract</button>
                <button className="col-span-2 bg-emerald-900/50 hover:bg-emerald-900/80 py-2 rounded text-xs text-emerald-400 border border-emerald-900 transition-colors">
                  <i className="fa-solid fa-check mr-2"></i>
                  Approve Discount
                </button>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SupervisorDashboard;