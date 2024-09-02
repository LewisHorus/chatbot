import React, { useContext } from 'react';
import { FiMessageCircle, FiMenu, FiSun, FiMoon } from 'react-icons/fi';
import { ThemeContext } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ setActiveSection, isOpen, setIsOpen }) => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <motion.aside
        initial={false}
        animate={{ width: isOpen ? '12rem' : '4rem' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`
          bg-white dark:bg-[#171717] dark:bg-opacity-70 
          flex flex-col items-center py-4 
          transition-all duration-300 ease-in-out
          fixed sm:relative h-full z-30
          ${isOpen ? 'w-64 sm:w-auto' : 'w-0 sm:w-16'}
          ${!isDarkMode ? 'shadow-sm' : ''} // Añadir sombra solo en modo claro
        `}
        style={{
          boxShadow: !isDarkMode ? '0 0 2px rgba(0, 0, 0, 0.1)' : 'none' // Sombra super delgada
        }}
      >
        <div className="w-full flex items-center justify-between px-4">
          <button onClick={toggleSidebar} className="text-gray-600 dark:text-gray-300 hover:text-[#5575b8]">
            <FiMenu size={24} />
          </button>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="w-full flex justify-center py-4"
            >
              <img src="/casa.png" alt="Logo" className="h-[2.5rem] w-auto" />
            </motion.div>
          )}
        </AnimatePresence>
        <nav className="flex-1 w-full flex flex-col justify-center space-y-8">
          <button 
            onClick={() => {
              setActiveSection('chatbot');
              if (window.innerWidth < 640) setIsOpen(false);
            }}
            className="flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-[#5575b8] w-full"
          >
            <FiMessageCircle size={24} />
            {isOpen && <span className="ml-2 text-sm sm:text-base">Chatbot</span>}
          </button>
        </nav>
        <div className="w-full mt-auto flex items-center justify-center py-4">
          <button 
            onClick={toggleTheme} 
            className="text-gray-600 dark:text-gray-300 hover:text-[#5575b8]"
          >
            {isDarkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
          </button>
        </div>
      </motion.aside>
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-30 text-gray-600 dark:text-gray-300 hover:text-[#5575b8] sm:hidden"
        >
          <FiMenu size={24} />
        </button>
      )}
    </>
  );
};

export default Sidebar;
