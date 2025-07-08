import { Snackbar } from "blend-v1";
import ResponsiveButtonDemo from "./demos/ResponsiveButtonDemo";
import ButtonSizeComparison from "./demos/ButtonSizeComparison";
import CustomBreakpointsDemo from "./demos/CustomBreakpointsDemo";
import { useState } from "react";

function App() {
  const [currentView, setCurrentView] = useState('demo');
  
  return (
    <main className="w-screen min-h-screen">
      <Snackbar />
      <div style={{ position: 'fixed', top: 10, right: 10, zIndex: 1000, display: 'flex', gap: '10px' }}>
        <button 
          onClick={() => setCurrentView('demo')}
          style={{ 
            padding: '10px 20px', 
            background: currentView === 'demo' ? '#007bff' : '#6c757d', 
            color: 'white', 
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Demo
        </button>
        <button 
          onClick={() => setCurrentView('sizes')}
          style={{ 
            padding: '10px 20px', 
            background: currentView === 'sizes' ? '#007bff' : '#6c757d', 
            color: 'white', 
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Size Comparison
        </button>
        <button 
          onClick={() => setCurrentView('custom')}
          style={{ 
            padding: '10px 20px', 
            background: currentView === 'custom' ? '#007bff' : '#6c757d', 
            color: 'white', 
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Custom Breakpoints
        </button>
      </div>
      {currentView === 'demo' && <ResponsiveButtonDemo />}
      {currentView === 'sizes' && <ButtonSizeComparison />}
      {currentView === 'custom' && <CustomBreakpointsDemo />}
    </main>
  );
}

export default App;
