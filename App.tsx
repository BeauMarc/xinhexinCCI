import React, { useState } from 'react';
import ChatWidget from './components/ChatWidget';
import SupervisorDashboard from './components/SupervisorDashboard';

const App: React.FC = () => {
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Hidden admin toggle handler
  const handleAdminEntry = (e: React.MouseEvent) => {
    if (e.detail === 3) { // Triple click to enter
      const password = prompt("Enter Supervisor Access Code:");
      if (password === "admin") {
        setIsAdminMode(true);
      }
    }
  };

  if (isAdminMode) {
    return <SupervisorDashboard onExit={() => setIsAdminMode(false)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-emerald-800 to-slate-50 -z-10"></div>
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-slate-800">
           <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-emerald-100 text-sm font-medium mb-4 backdrop-blur-md border border-white/20">
             New Core System 2.0
           </div>
           <h1 className="text-3xl md:text-5xl font-bold text-emerald-50 mb-6 tracking-tight">
             ChinaLife-JHPCIC<br/>
             <span className="text-emerald-200 text-2xl md:text-4xl mt-2 block font-medium">Large Group Client Business Service System</span>
           </h1>
           <p className="text-lg text-emerald-100/90 mb-10 max-w-2xl mx-auto">
             Dedicated to providing professional commercial motor vehicle insurance solutions for large corporate fleets.
           </p>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              {[
                { title: 'Fleet Policy Query', icon: 'fa-truck-fast', desc: 'Real-time status checks for commercial fleets.' },
                { title: 'Group Claims', icon: 'fa-file-signature', desc: 'Streamlined processing for bulk corporate claims.' },
                { title: 'Business Consultation', icon: 'fa-briefcase', desc: 'Expert advice for large group underwriting.' }
              ].map((item) => (
                <div key={item.title} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer border-t-4 border-emerald-600">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <i className={`fa-solid ${item.icon} text-xl`}></i>
                  </div>
                  <h3 className="font-semibold text-slate-800">{item.title}</h3>
                  <p className="text-sm text-slate-500 mt-2">{item.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* The Floating AI Chat Widget */}
      <ChatWidget />

      {/* Secret Admin Footer */}
      <div className="fixed bottom-2 left-2 text-slate-300 opacity-20 hover:opacity-100 transition-opacity">
         <button onClick={handleAdminEntry} className="text-xs" title="Triple click for admin">
            <i className="fa-solid fa-key"></i> System v2.0.4
         </button>
      </div>
      
    </div>
  );
};

export default App;