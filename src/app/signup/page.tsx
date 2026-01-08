// src/app/signup/page.tsx
import React from 'react';
import Navbar from '../../components/Navbar'; // Adjust path if necessary
import Footer from '../../components/Footer'; // Adjust path if necessary
import SignupForm from '../../components/SignupForm';

const SignupPage = () => {
  return (
    <div>
      <Navbar />
      <main className="flex justify-center items-center min-h-[70vh] bg-gray-50 p-8">
        <SignupForm />
      </main>
      <Footer />
    </div>
  );
};

export default SignupPage;