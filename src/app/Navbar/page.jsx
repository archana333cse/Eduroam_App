'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Moon, Sun, Contrast } from 'lucide-react';

export default function Navbar() {
  const [fontSize, setFontSize] = useState('text-base');
  const [darkMode, setDarkMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleContrast = () => setHighContrast(!highContrast);

  const fontSizeClasses = {
    small: 'text-sm',
    base: 'text-base',
    large: 'text-lg',
  };

  return (
    <header
      className={`${darkMode ? 'bg-gray-900 text-white' : ''} ${
        highContrast ? 'contrast-150' : ''
      } transition-colors duration-300`}
    >
      {/* Top Bar */}
      <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-orange-400 via-white to-green-600">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-900 text-white font-bold flex items-center justify-center rounded-full shadow">
            IN
          </div>
          <div>
            <h1 className="text-xl font-bold text-blue-900">eduroam India</h1>
            <p className="text-sm text-gray-700 max-w-xs">
              Department of Electronics & Information Technology | Ministry of Communications & IT | Government of India
            </p>
          </div>
        </div>

        {/* Accessibility Controls */}
        <div className="flex space-x-2">
          <button
            onClick={() => setFontSize(fontSizeClasses.large)}
            className="bg-blue-900 text-white px-2 py-1 rounded hover:bg-blue-800"
            aria-label="Increase Font Size"
          >
            A+
          </button>
          <button
            onClick={() => setFontSize(fontSizeClasses.small)}
            className="bg-blue-900 text-white px-2 py-1 rounded hover:bg-blue-800"
            aria-label="Decrease Font Size"
          >
            A-
          </button>
          <button
            onClick={toggleDarkMode}
            className="bg-blue-900 text-white px-2 py-1 rounded hover:bg-blue-800"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={toggleContrast}
            className="bg-blue-900 text-white px-2 py-1 rounded hover:bg-blue-800"
            aria-label="Toggle High Contrast"
          >
            <Contrast size={16} />
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className={`bg-blue-900 text-white ${fontSize}`}>
        <ul className="flex flex-wrap justify-center gap-6 py-2 text-sm sm:text-base">
          {[
            { name: 'Home', href: '/' },
            { name: 'About eduroam', href: '/about' },
            { name: 'Participating Institutions', href: '/institutions' },
            { name: 'Configuration', href: '/configurationPage' },
            { name: 'Support', href: '/support' },
            { name: 'Downloads', href: '/downloads' },
            { name: 'Policies', href: '/privacy' },
            { name: 'Contact Us', href: '/contact' },
          ].map((link) => (
            <li key={link.name}>
              <Link href={link.href} className="hover:underline">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
