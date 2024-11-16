import React from 'react';

function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-2 z-10">
      <div className="flex justify-around">
        <button className="text-white flex flex-col items-center">
          {/* Replace with appropriate icons */}
          <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7 7 7-7m-9 9V6" /></svg>
          Home
        </button>
        <button className="text-white flex flex-col items-center">
          <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          Profile
        </button>
        <button className="text-white flex flex-col items-center">
          <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 8v4l3 3m6 0a9 9 0 11-12-12" /></svg>
          Settings
        </button>
      </div>
    </nav>
  );
}

export default BottomNav;