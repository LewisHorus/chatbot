import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Chatbot from './components/Chatbot';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  const [activeSection, setActiveSection] = useState('chatbot');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ThemeProvider>
      <div className="h-screen bg-gray-100 dark:bg-black">
        <div className="grid grid-cols-1 sm:grid-cols-[auto,1fr] h-full">
          <Sidebar 
            setActiveSection={setActiveSection} 
            isOpen={isSidebarOpen} 
            setIsOpen={setIsSidebarOpen} 
          />
          <div className="flex flex-col h-full overflow-hidden">
            <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            <main className="flex-1 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black relative">
              <div
                className="absolute inset-0 bg-no-repeat bg-center bg-contain opacity-10 pointer-events-none"
                style={{
                  backgroundImage: 'url(/casa.png)',
                }}
              ></div>
              {activeSection === 'chatbot' && <Chatbot />}
            </main>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;