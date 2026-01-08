// src/app/login/page.tsx
import React from 'react';
import Navbar from '../../components/Navbar'; // Adjust path if necessary
import Footer from '../../components/Footer'; // Adjust path if necessary
import RaiseTicketPage from '../../components/raiseTicket';

// Note: Ensure the paths above match your file structure. 
// Based on the image, the path '../../components/' should be correct 
// because 'login' is inside 'app', and 'components' is outside 'app'.

const RaiseTicket = () => {
  return (
    <div>
      <Navbar />
      {/* The main content area where the form will be centered */}
      <main className="flex justify-center items-center min-h-[70vh] bg-gray-50 p-8">
        <RaiseTicketPage />
      </main>
      <Footer />
    </div>
  );
};

export default RaiseTicket;