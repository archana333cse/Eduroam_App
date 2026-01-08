
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { UserPlus, User, Lock, Building, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';

const SignupForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [institution, setInstitution] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setIsLoading(true);

    if (!username || !password || !institution) {
        setError('All fields are required.');
        setIsLoading(false);
        return;
    }
    
    try {
        // 1. Send request to the Signup API Route
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, institution }),
        });

        const data = await response.json();

        if (response.ok) {
            setSuccess(true);
            setError('');
            // Clear form fields after successful signup
            setUsername('');
            setPassword('');
            setInstitution('');
            
            console.log("Signup Success:", data);
            // You might redirect after a short delay
            setTimeout(() => window.location.href = '/login', 2000); 

        } else {
            setError(data.error || 'Registration failed. Try a different email.');
        }

    } catch (err) {
        setError('A network error occurred. Please try again.');
        console.error("Fetch Error:", err);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 sm:p-10 border-t-4 border-blue-900">
      <div className="flex items-center justify-center mb-6">
        <UserPlus className="w-8 h-8 text-blue-900 mr-3" />
        <h2 className="text-3xl font-bold text-gray-900">Sign Up</h2>
      </div>

      {success && (
        <div className="text-sm text-blue-600 bg-green-50 p-3 rounded-lg mb-4 flex items-center font-medium">
            <CheckCircle className="w-4 h-4 mr-2" />
            Registration successful! Redirecting to Login...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Username/Email Field */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="username"
              type="email"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="user@institution.edu"
            />
          </div>
        </div>

        {/* Institution Name Field */}
        <div>
          <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-1">
            Institution Name 
          </label>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="institution"
              type="text"
              required
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-900 focus:border-blue-900"
              placeholder="enter institution name"
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password (Min 8 characters)
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-900 focus:border-blue-900"
              placeholder="********"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg flex items-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-900 hover:bg-blue-700 disabled:opacity-50 transition duration-300"
        >
          {isLoading ? 'Registering...' : 'Sign Up'}
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </form>

      <div className="mt-6 text-center">
        <Link href="/login" className="text-sm font-medium text-blue-900 hover:text-blue-900 hover:underline">
          Already have an account? Log In
        </Link>
      </div>
    </div>
  );
};

export default SignupForm;