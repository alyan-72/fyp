import React from 'react';
import NavSidebar from '../NavSidebar/NavSidebar';
import Header from '../Header/Header';

function Layout({ children }) {
  return (
    <div className="flex bg-myblue w-screen">
      <NavSidebar />
      <div className="flex-grow h-[calc(100vh)] w-[calc(100vw-70px)] bg-myblue rounded-lg shadow-lg py-2 plx-2">
          <div className='bg-white rounded-3xl h-[calc(100vh-15px)] w-[calc(100vw-75px)]'>
            {children}
          </div>
        </div>
    </div>
  );
} 

export default Layout;