import React, { useState, useEffect, useRef } from 'react';
import { FiSend } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const userAvatar = 'https://i.picasion.com/pic92/f41f8c7f010d13ce7d0c2e642377f2d2.gif';
const botAvatar = 'https://i.imgur.com/UeIfMi4.png';
const startAvatar = './bot.png';
const sapImage = './sap.png';
const notebookImage = './imagen.png'; // Ruta del archivo de notebook que subiste

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [showYesNo, setShowYesNo] = useState(false);
  const [isChatStarted, setIsChatStarted] = useState(false);
  const [status, setStatus] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const messagesEndRef = useRef(null);

  const addMessage = (type, text, showYesNoAfter = false) => {
    if (type === 'user') {
      setMessages(prev => [...prev, { type, text }]);
    } else {
      setIsTyping(true);
      setStatus('Escribiendo...');
      setTimeout(() => {
        setMessages(prev => [...prev, { type, text }]);
        setIsTyping(false);
        setStatus('En línea');
        if (showYesNoAfter) {
          setShowYesNo(true);
        }
      }, 2000);
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() && !isTyping) {
      addMessage('user', inputMessage);
      setInputMessage('');
      if (selectedOption) {
        if (selectedOption === 'SAP') {
          addMessage('bot', <span>Usuario {inputMessage} desbloqueado de manera exitosa en SAP. <img src={sapImage} alt="SAP" style={{ width: '20px', height: '20px', verticalAlign: 'middle', marginLeft: '5px', display: 'inline-block' }} /></span>);
        } else if (selectedOption === 'PC/NBK') {
          addMessage('bot', `Usuario ${inputMessage} desbloqueado de manera exitosa en PC/NBK. 💻`);
        }
        addMessage('bot', '¿Puedo hacer algo más por ti?🤔', true);
        setSelectedOption(null);
      } else {
        addMessage('bot', 'Lo siento, no entiendo. 🥴 Por favor, selecciona una opción de desbloqueo. 👇');
      }
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    if (option === 'SAP') {
      addMessage('bot', <span>Has seleccionado: Desbloqueo de cuenta SAP <img src={sapImage} alt="SAP" style={{ width: '20px', height: '20px', verticalAlign: 'middle', marginLeft: '5px', display: 'inline-block' }} /></span>);
      addMessage('bot', <span>Por favor, ingresa el nombre de usuario que deseas desbloquear: Por Ejemplo <span style={{textDecoration: 'underline'}}>JRODRIGUEZ</span>.</span>);
    } else if (option === 'PC/NBK') {
      addMessage('bot', 'Has seleccionado: Desbloqueo de cuenta Inicio Sesion PC/NBK 💻');
      addMessage('bot', <span>Por favor, ingresa el nombre de usuario que deseas desbloquear. Debe ser <span style={{textDecoration: 'underline'}}>nombre.apellido</span>.</span>);
    }
    setShowOptions(false);
  };

  const handleYesNoRes = (res) => {
    setShowYesNo(false);
    if (res === 'SI') {
      addMessage('bot', 'Selecciona una opción de desbloqueo:');
      setTimeout(() => {
        setShowOptions(true);
      }, 2000);
    } else {
      addMessage('bot', 'De acuerdo, si necesitas algo más, estaré aquí.👋');
      setTimeout(() => {
        resetChat();
      }, 5000);
    }
  };

  const startChat = () => {
    setIsChatStarted(true);
    setStatus('En línea');
    addMessage('bot', '¡Bienvenido al asistente de desbloqueo de cuentas de Casaideas! ¿En qué puedo ayudarte hoy? 😊');
    setTimeout(() => {
      addMessage('bot', 'Pincha algunas de las opciones que se encuentran en la parte inferior del chat. 👇');
      setTimeout(() => {
        setShowOptions(true);
      }, 3000);
    }, 2000);
  };

  const resetChat = () => {
    setIsChatStarted(false);
    setMessages([]);
    setSelectedOption(null);
    setShowYesNo(false);
    setShowOptions(false);
    setStatus('');
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showOptions]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-20 p-4"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="bg-white bg-opacity-70 dark:bg-[#171717] dark:bg-opacity-90 rounded-xl p-4 sm:p-6 h-[90vh] w-full max-w-3xl flex flex-col shadow-2xl"
      >
        {isChatStarted ? (
          <>
            <h2 className="text-sm font-semibold mb-4 text-gray-800 dark:text-gray-200">
              <span className={status === 'Escribiendo...' ? 'italic' : ''}>{status}</span>
            </h2>
            <div className="flex-1 overflow-y-auto mb-4 custom-scrollbar">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`mb-2 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.type === 'bot' && (
                      <img src={botAvatar} alt="Bot Avatar" className="w-8 h-8 sm:w-12 sm:h-12 rounded-full mr-2" />
                    )}
                    <span className={`inline-block p-2 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-[#5575b8] text-white' 
                        : 'bg-[#e0a1bb] text-gray-800'
                    } max-w-[70%] break-words`}>
                      {message.text}
                    </span>
                    {message.type === 'user' && (
                      <img src={userAvatar} alt="User Avatar" className="w-8 h-8 sm:w-12 sm:h-12 rounded-full ml-2" />
                    )}
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="mb-2 flex justify-start"
                  >
                    <img src={botAvatar} alt="Bot Avatar" className="w-8 h-8 sm:w-12 sm:h-12 rounded-full mr-2" />
                    <span className="typing-indicator p-2 rounded-lg bg-[#e0a1bb] text-gray-800">
                      <span className="typing-animation">...</span>
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
            {showYesNo && (
              <div className="mb-4 flex space-x-2 justify-center">
                <button 
                  className="bg-[#69b5ad] text-white p-2 rounded-lg hover:bg-opacity-80 text-xs sm:text-sm px-2 sm:px-4"
                  onClick={() => handleYesNoRes('SI')}
                >
                  Sí
                </button>
                <button 
                  className="bg-[#69b5ad] text-white p-2 rounded-lg hover:bg-opacity-80 text-xs sm:text-sm px-2 sm:px-4"
                  onClick={() => handleYesNoRes('NO')}
                >
                  No
                </button>
              </div>
            )}
            {showOptions && (
  <div className="mb-4 flex space-x-2 justify-center">
    <button
      className="bg-[#5575b8] text-white p-2 rounded-lg hover:bg-opacity-80 text-xs sm:text-sm px-2 sm:px-4 flex items-center"
      onClick={() => handleOptionSelect('SAP')}
    >
      <img src={sapImage} alt="SAP" className="w-4 h-4 mr-2" />
      Desbloqueo de Cuenta SAP
    </button>
    <button
      className="bg-[#5575b8] text-white p-2 rounded-lg hover:bg-opacity-80 text-xs sm:text-sm px-2 sm:px-4 flex items-center"
      onClick={() => handleOptionSelect('PC/NBK')}
    >
      Desbloqueo Inicio Sesion PC/NBK 💻
    </button>
  </div>
)}
            <div className="flex">
              <input
                type="text"
                className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400 dark:border-gray-700 dark:bg-[#1f1f1f] dark:text-gray-100 dark:focus:border-blue-400"
                placeholder="Escribe un mensaje..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={isTyping}
              />
              <button
                className="ml-2 bg-[#5575b8] text-white p-2 rounded-lg hover:bg-opacity-80"
                onClick={handleSendMessage}
                disabled={isTyping}
              >
                <FiSend />
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <img src={startAvatar} alt="Bot Avatar" className="w-16 h-16 rounded-full mb-4" />
            <button
              className="bg-[#5575b8] text-white p-2 rounded-lg hover:bg-opacity-80 text-xs sm:text-sm px-2 sm:px-4"
              onClick={startChat}
            >
              Iniciar Chat
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Chatbot;