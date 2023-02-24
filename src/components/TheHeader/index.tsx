import React from 'react';

const TheHeader = () => {
  return (
    <header>
      <div className="bg-pink-700 md:pl-12 md:pr-12 pl-5 pr-5 pt-5 pb-5">
        <div className="flex flex-col md:flex-row justify-between gap-5">
          <a href="/" className="font-poppins font-bold text-2xl text-gray-50">
            PokeView
          </a>
        </div>
      </div>
    </header>
  );
};

export default TheHeader;
