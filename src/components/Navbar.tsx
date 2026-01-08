// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect } from "react";

// import { Moon, Sun, LayoutGrid, Menu, X } from "lucide-react";

// const Navbar = () => {


// //function for current time 
// // const [time, setTime] = useState<string>(() => new Date().toLocaleTimeString());

//   const [time, setTime] = useState<string>("");

//   useEffect(() => {
//     const updateTime = () => {
//       const current = new Date().toLocaleTimeString('en-IN', {
//         hour: '2-digit',
//         minute: '2-digit',
//         second: '2-digit',
//         hour12: true,
//       });
//       setTime(current);
//     };

//     updateTime(); // Initial render
//     const interval = setInterval(updateTime, 1000);

//     return () => clearInterval(interval); // Cleanup
//   }, []);



//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <div className="w-full">
//       {/* Top Header */}
//        <div className="bg-blue-900 text-white px-6 py-2 flex items-center  justify-between">
//         <div className="left">
//                   <p className="text-xs">Ministry of Electronics & Information Technology | Government of India</p>

//         </div>
//         <div className="right">
//            <div className="text-xs text-white-800">
//             <p className="text-xs ">
//               {time ? `Current Time: ${time}` : 'Loading time...'}

//             </p>
//     </div>
//         </div>
//       </div>
//       <div className="bg-gradient-to-r from-orange-400 via-white to-green-600 p-4 flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
//         <div className="flex flex-col  space-x-4">
//           <div className="flex">
//             <div className=" text-white font-bold w-40 h-14 md:w-26 md:h-16 flex items-center  ">
//               <a href="/homepage">
//                 <Image
//                 src="/ERNET_India_logo.png"
//                 alt="eduroam Logo"
//                 width={120}
//                 height={120}
//                 className=""
//               />
//               </a>
//             </div>
//             <div className="eduroam  md:block">
//               <a href="/homepage">
//                 <Image
//                 src="/eduroam_logo.png"
//                 alt="eduroam Logo"
//                 width={120}
//                 height={120}
//                 className=""
//               />
//               </a>
//             </div>
//           </div>
//           {/* <div>
//             <p className="text-gray-700 text-sm md:text-base font-medium">
//               Ministry of Electronics & Information Technology | Government of
//               India
//             </p>
//           </div> */}
//         </div>

//         {/* Buttons: A+, A-, Theme Toggle, Layout */}
//         <div className=" w-full flex justify-between md:justify-end  items-center space-x-2">
//           {/* <button className="bg-blue-900 text-white px-3 py-1 rounded text-sm">A+</button>
//           <button className="bg-blue-900 text-white px-3 py-1 rounded text-sm">A-</button> */}
//           {/* <div className="flex bg-gradient-to-r from-gray-900 to-purple-400 px-2 py-1 rounded items-center">
//             <Moon className="text-white" size={16} />
//             <Sun className="text-white ml-1" size={16} />
//           </div> */}
//           {/* <button className="bg-blue-900 text-white p-2 rounded hidden sm:block">
//             <LayoutGrid size={16} />
//           </button> */}
//           <div>
//             <Image
//               src="/Government_of_India_logo.svg.png" // Relative path (public folder) or external URL
//               alt="Logo"
//               width={120} // Required
//               height={64} // Required
//             />
//           </div>

//           <div>
//             <button
//             className="md:hidden text-blue-900 p-2"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             {menuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//           </div>
//         </div>
//       </div>

//       {/* Navigation Menu */}
//       <nav className="bg-blue-900 text-white px-6 py-2">
//         <ul
//           className={`md:flex md:space-x-8 text-sm font-medium ${
//             menuOpen ? "block" : "hidden"
//           } md:block`}
//         >
//           <li className="hover:underline py-2 md:py-0 cursor-pointer">
//             <Link href="/">Home</Link>
//           </li>
//           <li className="hover:underline py-2 md:py-0 cursor-pointer">
//             <Link href="/about">About eduroam</Link>
//           </li>
//           <li className="hover:underline py-2 md:py-0 cursor-pointer">
//             <Link href="/institutions">Indian Presence</Link>
//           </li>
//           <li className="hover:underline py-2 md:py-0 cursor-pointer">
//             <Link href="/configurationPage">Configuration</Link>
//           </li>
//           {/* <li className="hover:underline py-2 md:py-0 cursor-pointer">
//     <Link href="/support">Support</Link>
//   </li> */}
//           <li className="hover:underline py-2 md:py-0 cursor-pointer">
//             <Link href="/request">Request Form</Link>
//           </li>
//           <li className="hover:underline py-2 md:py-0 cursor-pointer">
//             <Link href="/privacy">Policies</Link>
//           </li>
//           <li className="hover:underline py-2 md:py-0 cursor-pointer">
//             <Link href="/contact_us">Contact Us</Link>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;


// src/components/Navbar.tsx

// 'use client';

// import React, { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect } from "react";

// import { LogIn, UserPlus, Menu, X } from "lucide-react"; // Added LogIn and UserPlus icons

// const Navbar = () => {
//     // ... (Existing time state and useEffect logic) ...
//     const [time, setTime] = useState<string>("");

//     useEffect(() => {
//         const updateTime = () => {
//             const current = new Date().toLocaleTimeString('en-IN', {
//                 hour: '2-digit',
//                 minute: '2-digit',
//                 second: '2-digit',
//                 hour12: true,
//             });
//             setTime(current);
//         };

//         updateTime();
//         const interval = setInterval(updateTime, 1000);

//         return () => clearInterval(interval);
//     }, []);

//     const [menuOpen, setMenuOpen] = useState(false);

//     // Placeholder state for authentication (will be replaced by context/NextAuth later)
//     const isAuthenticated = false; // Set to true to test Dashboard/Logout links

//     const handleLogout = () => {
//         // Placeholder for future logout logic
//         console.log("Logout clicked");
//     };


//     return (
//         <div className="w-full">
//             {/* Top Header */}
//             <div className="bg-blue-900 text-white px-6 py-2 flex items-center justify-between">
//                 <div className="left">
//                     <p className="text-xs">Ministry of Electronics & Information Technology | Government of India</p>
//                 </div>
//                 <div className="right">
//                     <div className="text-xs text-white-800">
//                         <p className="text-xs ">
//                             {time ? `Current Time: ${time}` : 'Loading time...'}
//                         </p>
//                     </div>
//                 </div>
//             </div>
            
//             {/* Main Header/Logo Bar */}
//             <div className="bg-gradient-to-r from-orange-400 via-white to-green-600 p-4 flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
//                 {/* Logo Section */}
//                 <div className="flex flex-col space-x-4">
//                     <div className="flex">
//                         <div className="text-white font-bold w-40 h-14 md:w-26 md:h-16 flex items-center">
//                             <a href="/homepage">
//                                 <Image
//                                     src="/ERNET_India_logo.png"
//                                     alt="ERNET India Logo"
//                                     width={120}
//                                     height={120}
//                                     className=""
//                                 />
//                             </a>
//                         </div>
//                         <div className="eduroam md:block">
//                             <a href="/homepage">
//                                 <Image
//                                     src="/eduroam_logo.png"
//                                     alt="eduroam Logo"
//                                     width={120}
//                                     height={120}
//                                     className=""
//                                 />
//                             </a>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Gov Logo and Mobile Menu Button */}
//                 <div className="w-full flex justify-between md:justify-end items-center space-x-2">
//                     <div>
//                         <Image
//                             src="/Government_of_India_logo.svg.png" 
//                             alt="Government of India Logo"
//                             width={120} 
//                             height={64} 
//                         />
//                     </div>
//                     <div>
//                         <button
//                             className="md:hidden text-blue-900 p-2"
//                             onClick={() => setMenuOpen(!menuOpen)}
//                         >
//                             {menuOpen ? <X size={24} /> : <Menu size={24} />}
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Navigation Menu */}
//             <nav className="bg-blue-900 text-white px-6 py-2">
//                 <ul
//                     className={`md:flex md:space-x-8 text-sm font-medium ${
//                         menuOpen ? "block" : "hidden"
//                     } md:flex md:justify-between`} // Added md:justify-between here
//                 >
//                     {/* Main Links Container */}
//                     <div className="md:flex md:space-x-8"> 
//                         <li className="hover:underline py-2 md:py-0 cursor-pointer">
//                             <Link href="/">Home</Link>
//                         </li>
//                         <li className="hover:underline py-2 md:py-0 cursor-pointer">
//                             <Link href="/about">About eduroam</Link>
//                         </li>
//                         <li className="hover:underline py-2 md:py-0 cursor-pointer">
//                             <Link href="/institutions">Indian Presence</Link>
//                         </li>
//                         <li className="hover:underline py-2 md:py-0 cursor-pointer">
//                             <Link href="/configurationPage">Configuration</Link>
//                         </li>
//                         <li className="hover:underline py-2 md:py-0 cursor-pointer">
//                             <Link href="/request">Request Form</Link>
//                         </li>
//                         <li className="hover:underline py-2 md:py-0 cursor-pointer">
//                             <Link href="/privacy">Policies</Link>
//                         </li>
//                         <li className="hover:underline py-2 md:py-0 cursor-pointer">
//                             <Link href="/contact_us">Contact Us</Link>
//                         </li>
//                     </div>
                    
//                     {/* Login/Signup Buttons - Pushed to the extreme right on desktop */}
//                     <div className="flex flex-col md:flex-row md:space-x-4">
//                         {isAuthenticated ? (
//                             <>
//                                 <li className="py-2 md:py-0 cursor-pointer">
//                                     <Link href="/dashboard" className="text-orange-400 hover:text-white font-bold transition-colors">
//                                         Dashboard
//                                     </Link>
//                                 </li>
//                                 <li className="py-2 md:py-0 cursor-pointer">
//                                     <button 
//                                         onClick={handleLogout} 
//                                         className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition-colors flex items-center"
//                                     >
//                                         <LogIn size={16} className="mr-1" /> Logout
//                                     </button>
//                                 </li>
//                             </>
//                         ) : (
//                             <>
//                                 <li className="py-2 md:py-0 cursor-pointer">
//                                     <Link href="/login" className="bg-green-600 px-3 py-1 rounded hover:bg-green-700 transition-colors flex items-center font-medium">
//                                         <LogIn size={16} className="mr-1" /> Login
//                                     </Link>
//                                 </li>
//                                 <li className="py-2 md:py-0 cursor-pointer">
//                                     <Link href="/signup" className="bg-orange-500 px-3 py-1 rounded hover:bg-orange-600 transition-colors flex items-center font-medium mt-2 md:mt-0">
//                                         <UserPlus size={16} className="mr-1" /> Sign Up
//                                     </Link>
//                                 </li>
//                             </>
//                         )}
//                     </div>
//                 </ul>
//             </nav>
//         </div>
//     );
// };

// export default Navbar;




// 'use client';

// import React, { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect } from "react";
// // Import necessary icons and the NextAuth hooks
// import { LogIn, UserPlus, Menu, X, LogOut, LayoutGrid } from "lucide-react"; 
// import { useSession, signOut } from 'next-auth/react'; 

// const Navbar = () => {
    
//     // --- Auth State using NextAuth Hook ---
//     // status is 'loading', 'authenticated', or 'unauthenticated'
//     const { data: session, status } = useSession(); 
//     const isLoggedIn = status === 'authenticated';
//     // -------------------------------------

//     const [time, setTime] = useState<string>("");

//     useEffect(() => {
//         const updateTime = () => {
//             const current = new Date().toLocaleTimeString('en-IN', {
//                 hour: '2-digit',
//                 minute: '2-digit',
//                 second: '2-digit',
//                 hour12: true,
//             });
//             setTime(current);
//         };

//         updateTime();
//         const interval = setInterval(updateTime, 1000);

//         return () => clearInterval(interval);
//     }, []);

//     const [menuOpen, setMenuOpen] = useState(false);

//     return (
//         <div className="w-full">
//             {/* Top Header */}
//             <div className="bg-blue-900 text-white px-6 py-2 flex items-center justify-between">
//                 <div className="left">
//                     <p className="text-xs">Ministry of Electronics & Information Technology | Government of India</p>
//                 </div>
//                 <div className="right">
//                     <div className="text-xs text-white-800">
//                         <p className="text-xs ">
//                             {time ? `Current Time: ${time}` : 'Loading time...'}
//                         </p>
//                     </div>
//                 </div>
//             </div>
            
//             {/* Main Header/Logo Bar */}
//             <div className="bg-gradient-to-r from-orange-400 via-white to-green-600 p-4 flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
//                 {/* Logo Section */}
//                 <div className="flex flex-col space-x-4">
//                     <div className="flex">
//                         <div className="text-white font-bold w-40 h-14 md:w-26 md:h-12 flex items-center">
//                             <a href="/homepage">
//                                 <Image
//                                     src="/ernet-removebg-preview.png"
//                                     alt="ERNET India Logo"
//                                     width={120}
//                                     height={120}
//                                     className=""
//                                 />
//                             </a>
//                         </div>
//                         <div className="eduroam md:block">
//                             <a href="/homepage">
//                                 <Image
//                                     src="/eduroam_logo.png"
//                                     alt="eduroam Logo"
//                                     width={120}
//                                     height={120}
//                                     className=""
//                                 />
//                             </a>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Gov Logo and Mobile Menu Button */}
//                 <div className="w-full flex justify-between md:justify-end items-center space-x-2">
//                     <div>
//                         <Image
//                             src="/Government_of_India_logo.svg.png" 
//                             alt="Government of India Logo"
//                             width={120} 
//                             height={64} 
//                         />
//                     </div>
//                     <div>
//                         <button
//                             className="md:hidden text-blue-900 p-2"
//                             onClick={() => setMenuOpen(!menuOpen)}
//                         >
//                             {menuOpen ? <X size={24} /> : <Menu size={24} />}
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Navigation Menu */}
//             <nav className="bg-blue-900 text-white px-6 py-2">
//                 <ul
//                     className={`md:flex md:space-x-8 text-sm font-medium ${
//                         menuOpen ? "block" : "hidden"
//                     } md:flex md:justify-between`}
//                 >
//                     {/* Main Links Container (Left Side) */}
//                     <div className="md:flex md:space-x-8"> 
//                         <li className="hover:underline py-2 md:py-0 cursor-pointer">
//                             <Link href="/">Home</Link>
//                         </li>
//                         <li className="hover:underline py-2 md:py-0 cursor-pointer">
//                             <Link href="/about">About eduroam</Link>
//                         </li>
//                         <li className="hover:underline py-2 md:py-0 cursor-pointer">
//                             <Link href="/institutions">Indian Presence</Link>
//                         </li>
//                         <li className="hover:underline py-2 md:py-0 cursor-pointer">
//                             <Link href="/configurationPage">Configuration</Link>
//                         </li>
//                         <li className="hover:underline py-2 md:py-0 cursor-pointer">
//                             <Link href="/request">Request Form</Link>
//                         </li>
//                         <li className="hover:underline py-2 md:py-0 cursor-pointer">
//                             <Link href="/privacy">Policies</Link>
//                         </li>
//                         <li className="hover:underline py-2 md:py-0 cursor-pointer">
//                             <Link href="/contact_us">Contact Us</Link>
//                         </li>
//                     </div>
                    
//                     {/* Auth Buttons (Right Side) - CONDITIONAL RENDERING */}
//                     <div className="flex flex-col md:flex-row md:space-x-4">
//                         {isLoggedIn ? (
//                             // 1. SHOW DASHBOARD and LOGOUT when logged in
//                             <>
//                                 <li className="py-2 md:py-0 cursor-pointer">
//                                     <Link href="/dashboard" className="text-orange-400 hover:text-white font-bold transition-colors flex items-center">
//                                         <LayoutGrid size={16} className="mr-1" /> Dashboard
//                                     </Link>
//                                 </li>
//                                 <li className="py-2 md:py-0 cursor-pointer">
//                                     <button 
//                                         // Calls NextAuth signout and redirects to the home page
//                                         onClick={() => signOut({ callbackUrl: '/' })} 
//                                         className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition-colors flex items-center"
//                                     >
//                                         <LogOut size={16} className="mr-1" /> Logout
//                                     </button>
//                                 </li>
//                             </>
//                         ) : (
//                             // 2. SHOW LOGIN and SIGN UP when logged out
//                             <>
//                                 <li className="py-2 md:py-0 cursor-pointer">
//                                     <Link href="/login" className="bg-green-600 px-3 py-1 rounded hover:bg-green-700 transition-colors flex items-center font-medium">
//                                         <LogIn size={16} className="mr-1" /> Login
//                                     </Link>
//                                 </li>
//                                 <li className="py-2 md:py-0 cursor-pointer">
//                                     <Link href="/signup" className="bg-orange-500 px-3 py-1 rounded hover:bg-orange-600 transition-colors flex items-center font-medium mt-2 md:mt-0">
//                                         <UserPlus size={16} className="mr-1" /> Sign Up
//                                     </Link>
//                                 </li>
//                             </>
//                         )}
//                     </div>
//                 </ul>
//             </nav>
//         </div>
//     );
// };

// export default Navbar;



'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { LogIn, UserPlus, Menu, X, LogOut, User } from "lucide-react";
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";

  const [time, setTime] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);        // Mobile menu toggle
  const [profileOpen, setProfileOpen] = useState(false);  // User dropdown toggle

  useEffect(() => {
    const updateTime = () => {
      const current = new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setTime(current);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      {/* Top Header */}
      <div className="bg-blue-900 text-white px-6 py-2 flex items-center justify-between">
        <p className="text-xs">
          Ministry of Electronics & Information Technology | Government of India
        </p>
        <p className="text-xs">{time ? `Current Time: ${time}` : "Loading time..."}</p>
      </div>

      {/* Main Header */}
      <div className="bg-gradient-to-r from-orange-400 via-white to-green-600 p-4 flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
        {/* Logo */}
        <div className="flex">
          <Link href="/homepage">
            <Image src="/ernet-removebg-preview.png" alt="ERNET India Logo" width={120} height={120} />
          </Link>
          <Link href="/homepage">
            <Image src="/eduroam_logo.png" alt="eduroam Logo" width={120} height={120} />
          </Link>
        </div>

        {/* GOI Logo + Mobile menu */}
        <div className="w-full flex justify-between md:justify-end items-center space-x-2">
          <Image src="/Government_of_India_logo.svg.png" alt="GOI Logo" width={120} height={64} />
          <button className="md:hidden text-blue-900 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Nav Menu */}
      <nav className="bg-blue-900 text-white px-6 py-2">
        <ul className={`md:flex md:space-x-8 text-sm font-medium ${menuOpen ? "block" : "hidden"} md:flex md:justify-between`}>
          {/* Left links */}
          <div className="md:flex md:space-x-8">
            <li className="hover:underline py-2 cursor-pointer"><Link href="/">Home</Link></li>
            <li className="hover:underline py-2 cursor-pointer"><Link href="/about">About eduroam</Link></li>
            <li className="hover:underline py-2 cursor-pointer"><Link href="/institutions">Indian Presence</Link></li>
            <li className="hover:underline py-2 cursor-pointer"><Link href="/configurationPage">Configuration</Link></li>
            <li className="hover:underline py-2 cursor-pointer"><Link href="/request">Request Form</Link></li>
            <li className="hover:underline py-2 cursor-pointer"><Link href="/privacy">Policies</Link></li>
            <li className="hover:underline py-2 cursor-pointer"><Link href="/contact_us">Contact Us</Link></li>
          </div>

          {/* Right side (Auth section) */}
          <div className="flex flex-col md:flex-row md:space-x-4">
            {isLoggedIn ? (
              <>
                {/* USER ICON DROPDOWN */}
                <li className="relative py-2 cursor-pointer">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 bg-orange-500 px-3 py-1 rounded hover:bg-orange-600 transition-colors font-bold"
                  >
                    <User size={18} /> Profile
                  </button>

                  {profileOpen && (
                    <ul className="absolute right-0 bg-white text-blue-900 shadow-lg rounded-md mt-2 w-48 z-50">
                      <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer">
                        <Link href="/dashboard">Dashboard</Link>
                      </li>
                      <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer">
                        <Link href="/raise-ticket">Raise Ticket</Link>
                      </li>
                      <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer">
                        <button onClick={() => signOut({ callbackUrl: "/" })} className="w-full text-left">
                          Logout
                        </button>
                      </li>
                    </ul>
                  )}
                </li>
              </>
            ) : (
              <>
                <li className="py-2 cursor-pointer">
                  <Link href="/login" className="bg-green-600 px-3 py-1 rounded hover:bg-green-700 transition flex items-center font-medium">
                    <LogIn size={16} className="mr-1" /> Login
                  </Link>
                </li>
                <li className="py-2 cursor-pointer">
                  <Link href="/signup" className="bg-orange-500 px-3 py-1 rounded hover:bg-orange-600 transition flex items-center font-medium mt-2 md:mt-0">
                    <UserPlus size={16} className="mr-1" /> Sign Up
                  </Link>
                </li>
              </>
            )}
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
