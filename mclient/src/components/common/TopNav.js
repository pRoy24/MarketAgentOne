import React from 'react';

function TopNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-900 text-white p-2 z-10">
      <a href='/'>
      <img src={'/logo_mao_2.png'} className='h-[45px] ml-2'/>
      </a>
      <div className="text-center font-bold">
  
      </div>
    </nav>
  );
}

export default TopNav;