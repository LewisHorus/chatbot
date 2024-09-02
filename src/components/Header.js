import React, { useContext } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { ThemeContext } from '../contexts/ThemeContext';

const Header = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const currentDate = format(new Date(), 'EEEE, d MMM yyyy', { locale: es });

  return (
    <header
      className={`${
        isDarkMode
          ? 'bg-gray-800 text-white shadow-md border-b border-gray-700'
          : 'bg-[#5575b8] text-white shadow-md border-b border-gray-300'
      } relative z-10 flex flex-col justify-between h-24 rounded-b-lg font-roboto`}
    >
      <div className="flex justify-end items-center w-full h-full px-6">
        <div className="text-xl">
          {currentDate}
        </div>
      </div>
    </header>
  );
};

export default Header;
