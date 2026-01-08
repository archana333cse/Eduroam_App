// // src/components/LoginForm.tsx
// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { LogIn, User, Lock, ArrowRight, AlertCircle } from 'lucide-react';

// // NOTE: This uses mock logic, we will integrate it with MongoDB/NextAuth later.

// const LoginForm: React.FC = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);

//     if (!username || !password) {
//       setError('Please enter both institutional email and password.');
//       setIsLoading(false);
//       return;
//     }

//     try {
//         // 1. Send request to the Login API Route
//         const response = await fetch('/api/auth/login', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ username, password }),
//         });

//         const data = await response.json();

//         if (response.ok) {
//             console.log("Login Success:", data);
//             // In a real application, you would set the session/cookie here.
//             // For now, we simulate success and redirect:
//             alert('Login successful (MOCK)! Redirecting to Dashboard...'); 
//             window.location.href = '/dashboard'; // Client-side redirect
//         } else {
//             // Handle specific errors returned by your API Route
//             setError(data.error || 'Login failed. Check your credentials.');
//         }

//     } catch (err) {
//         setError('A network error occurred. Please try again.');
//         console.error("Fetch Error:", err);
//     } finally {
//         setIsLoading(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 sm:p-10 border-t-4 border-blue-600">
//       <div className="flex items-center justify-center mb-6">
//         <LogIn className="w-8 h-8 text-blue-600 mr-3" />
//         <h2 className="text-3xl font-bold text-gray-900">Log In</h2>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Username/Email Field */}
//         <div>
//           <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
//             Institutional Email
//           </label>
//           <div className="relative">
//             <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <input
//               id="username"
//               type="text"
//               required
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               placeholder="user@institution.edu"
//             />
//           </div>
//         </div>

//         {/* Password Field */}
//         <div>
//           <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//             Password
//           </label>
//           <div className="relative">
//             <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <input
//               id="password"
//               type="password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               placeholder="********"
//             />
//           </div>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg flex items-center">
//             <AlertCircle className="w-4 h-4 mr-2" />
//             {error}
//           </p>
//         )}

//         <button
//           type="submit"
//           disabled={isLoading}
//           className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition duration-300"
//         >
//           {isLoading ? 'Authenticating...' : 'Log In'}
//           <ArrowRight className="w-5 h-5 ml-2" />
//         </button>
//       </form>

//       <div className="mt-6 text-center">
//         <Link href="/signup" className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline">
//           Don't have an account? Sign Up
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;



// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { LogIn, User, Lock, ArrowRight, AlertCircle } from 'lucide-react';
// import { signIn } from 'next-auth/react'; // <-- Critical Import
// import { useRouter } from 'next/navigation'; // <-- Critical Import

// const LoginForm: React.FC = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);

//     if (!username || !password) {
//       setError('Please enter both institutional email and password.');
//       setIsLoading(false);
//       return;
//     }

//     // Use NextAuth signIn function to communicate with the server handler
//     const result = await signIn('credentials', {
//       username,
//       password,
//       redirect: false, // Handle redirect manually on the client
//     });

//     setIsLoading(false);

//     if (result?.error) {
//       // Error message comes from the authorize() function in [...nextauth]/route.ts
//       setError("Login failed. Check your institutional email and password.");
//       console.error("Login Error:", result.error);
//     } else if (result?.ok) {
//       // Login successful: Redirect user to the protected dashboard
//       router.push('/dashboard');
//     }
//   };

//   return (
//     <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 sm:p-10 border-t-4 border-blue-900">
//       <div className="flex items-center justify-center mb-6">
//         <LogIn className="w-8 h-8 text-blue-900 mr-3" />
//         <h2 className="text-3xl font-bold text-gray-900">Log In</h2>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
//             Email
//           </label>
//           <div className="relative">
//             <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <input
//               id="username"
//               type="text"
//               required
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               placeholder="user@institution.edu"
//             />
//           </div>
//         </div>

//         <div>
//           <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//             Password
//           </label>
//           <div className="relative">
//             <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <input
//               id="password"
//               type="password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-900 focus:border-blue-900"
//               placeholder="********"
//             />
//           </div>
//         </div>

//         {error && (
//           <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg flex items-center">
//             <AlertCircle className="w-4 h-4 mr-2" />
//             {error}
//           </p>
//         )}

//         <button
//           type="submit"
//           disabled={isLoading}
//           className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-900 hover:bg-blue-700 disabled:opacity-50 transition duration-300"
//         >
//           {isLoading ? 'Authenticating...' : 'Log In'}
//           <ArrowRight className="w-5 h-5 ml-2" />
//         </button>
//       </form>

//       <div className="mt-6 text-center">
//         <Link href="/signup" className="text-sm font-medium text-blue-900 hover:text-blue-700 hover:underline">
//           Don't have an account? Sign Up
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;


// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { LogIn, User, Lock, ArrowRight, AlertCircle } from 'lucide-react';
// import { signIn } from 'next-auth/react'; 
// import { useRouter } from 'next/navigation'; 

// const LoginForm: React.FC = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);

//     if (!username || !password) {
//       setError('Please enter both institutional email and password.');
//       setIsLoading(false);
//       return;
//     }

//     const result = await signIn('credentials', {
//       username,
//       password,
//       redirect: false, 
//     });

//     setIsLoading(false);

//     if (result?.error) {
//       setError("Login failed. Check your institutional email and password.");
//       console.error("Login Error:", result.error);
//     } else if (result?.ok) {
//       // Login successful: Redirect user
      
//       // --- THIS IS THE ONLY CHANGE ---
//       router.push('/dashboard?login=true'); // <-- MODIFIED
//     }
//   };

//   return (
//     // ... (rest of your JSX code is unchanged)
//     <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 sm:p-10 border-t-4 border-blue-900">
//       <div className="flex items-center justify-center mb-6">
//         <LogIn className="w-8 h-8 text-blue-900 mr-3" />
//         <h2 className="text-3xl font-bold text-gray-900">Log In</h2>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
//             Email
//           </label>
//           <div className="relative">
//             <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <input
//               id="username"
//               type="text"
//               required
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               placeholder="user@institution.edu"
//             />
//           </div>
//         </div>

//         <div>
//           <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//             Password
//           </label>
//           <div className="relative">
//             <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <input
//               id="password"
//               type="password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-900 focus:border-blue-900"
//               placeholder="********"
//             />
//           </div>
//         </div>

//         {error && (
//           <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg flex items-center">
//             <AlertCircle className="w-4 h-4 mr-2" />
//             {error}
//           </p>
//         )}

//         <button
//           type="submit"
//           disabled={isLoading}
//           className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-900 hover:bg-blue-700 disabled:opacity-50 transition duration-300"
//         >
//           {isLoading ? 'Authenticating...' : 'Log In'}
//           <ArrowRight className="w-5 h-5 ml-2" />
//         </button>
//       </form>

//       <div className="mt-6 text-center">
//         <Link href="/signup" className="text-sm font-medium text-blue-900 hover:text-blue-700 hover:underline">
//           Don't have an account? Sign Up
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;



// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { LogIn, User, Lock, ArrowRight, AlertCircle, ShieldCheck } from 'lucide-react'; // Added ShieldCheck icon
// import { signIn } from 'next-auth/react'; 
// import { useRouter } from 'next/navigation'; 

// const LoginForm: React.FC = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   // Default to 'admin' or empty. 
//   // Values must match your DB values exactly: 'admin' | 'superAdmin'
//   const [role, setRole] = useState('admin'); 
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);

//     if (!username || !password) {
//       setError('Please enter email, password, and select a role.');
//       setIsLoading(false);
//       return;
//     }

//     const result = await signIn('credentials', {
//       username,
//       password,
//       role, // <--- PASS THE SELECTED ROLE HERE
//       redirect: false, 
//     });

//     setIsLoading(false);

//     if (result?.error) {
//       // We can give a more specific error if the backend returns one, 
//       // but generic is safer for security.
//       setError("Login failed. Incorrect credentials or role.");
//       console.error("Login Error:", result.error);
//     } else if (result?.ok) {
//       // Optional: You might want to redirect SuperAdmins to a different page
//       // if (role === 'superAdmin') router.push('/admin/dashboard');
//       // else ...
//       router.push('/dashboard?login=true'); 
//     }
//   };

//   return (
//     <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 sm:p-10 border-t-4 border-blue-900">
//       <div className="flex items-center justify-center mb-6">
//         <LogIn className="w-8 h-8 text-blue-900 mr-3" />
//         <h2 className="text-3xl font-bold text-gray-900">Log In</h2>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
        
//         {/* --- NEW ROLE DROPDOWN SECTION --- */}
//         <div>
//           <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
//             Login As
//           </label>
//           <div className="relative">
//             <ShieldCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <select
//               id="role"
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none"
//             >
//               <option value="admin">Institutional Admin</option>
//               <option value="superAdmin">Super Admin</option>
//             </select>
//              {/* Custom arrow for select usually needs CSS, keeping it simple here */}
//           </div>
//         </div>

//         <div>
//           <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
//             Email
//           </label>
//           <div className="relative">
//             <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <input
//               id="username"
//               type="text"
//               required
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               placeholder="user@institution.edu"
//             />
//           </div>
//         </div>

//         <div>
//           <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//             Password
//           </label>
//           <div className="relative">
//             <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <input
//               id="password"
//               type="password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-900 focus:border-blue-900"
//               placeholder="********"
//             />
//           </div>
//         </div>

//         {error && (
//           <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg flex items-center">
//             <AlertCircle className="w-4 h-4 mr-2" />
//             {error}
//           </p>
//         )}

//         <button
//           type="submit"
//           disabled={isLoading}
//           className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-900 hover:bg-blue-700 disabled:opacity-50 transition duration-300"
//         >
//           {isLoading ? 'Authenticating...' : 'Log In'}
//           <ArrowRight className="w-5 h-5 ml-2" />
//         </button>
//       </form>

//       <div className="mt-6 text-center">
//         <Link href="/signup" className="text-sm font-medium text-blue-900 hover:text-blue-700 hover:underline">
//           Don't have an account? Sign Up
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;




// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { LogIn, User, Lock, ArrowRight, AlertCircle, ShieldCheck } from 'lucide-react';
// import { signIn } from 'next-auth/react';
// import { useRouter } from 'next/navigation';

// const LoginForm: React.FC = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('admin'); // admin | superAdmin
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);

//     if (!username || !password) {
//       setError('Please enter email and password.');
//       setIsLoading(false);
//       return;
//     }

//     const result = await signIn('credentials', {
//       username,
//       password,
//       role,
//       redirect: false,
//     });

//     setIsLoading(false);

//     if (result?.error) {
//       setError("Login failed. Incorrect credentials or role.");
//       console.error("Login Error:", result.error);
//       return;
//     }

//     // ----------------------------
//     // 🔥 FETCH USER DETAILS AFTER LOGIN
//     // ----------------------------
//     try {
//       const userRes = await fetch("/api/auth/me");
//       const userData = await userRes.json();

//       if (userRes.ok) {
//         // 🔥 Save user & token to localStorage
//         localStorage.setItem("user", JSON.stringify(userData.user));
//         localStorage.setItem("token", userData.token);

//         // 🔥 Redirect based on role
//         if (userData.user.role === "superAdmin") {
//           router.push("/dashboard/super");
//         } else {
//           router.push(`/dashboard/${userData.user.institution}`);
//         }
//       } else {
//         console.error("Failed to fetch user details");
//       }
//     } catch (err) {
//       console.error("Auth error:", err);
//     }
//   };

//   return (
//     <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 sm:p-10 border-t-4 border-blue-900">
//       <div className="flex items-center justify-center mb-6">
//         <LogIn className="w-8 h-8 text-blue-900 mr-3" />
//         <h2 className="text-3xl font-bold text-gray-900">Log In</h2>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">

//         {/* Role selection */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Login As
//           </label>
//           <div className="relative">
//             <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <select
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white"
//             >
//               <option value="admin">Institutional Admin</option>
//               <option value="superAdmin">Super Admin</option>
//             </select>
//           </div>
//         </div>

//         {/* Email */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//           <div className="relative">
//             <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <input
//               type="text"
//               required
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               placeholder="user@institution.edu"
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//         </div>

//         {/* Password */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//           <div className="relative">
//             <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <input
//               type="password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="********"
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-900 focus:border-blue-900"
//             />
//           </div>
//         </div>

//         {error && (
//           <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg flex items-center">
//             <AlertCircle className="w-4 h-4 mr-2" />
//             {error}
//           </p>
//         )}

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={isLoading}
//           className="w-full flex justify-center items-center px-4 py-2 rounded-lg font-medium text-white bg-blue-900 hover:bg-blue-700 disabled:opacity-50 transition"
//         >
//           {isLoading ? "Authenticating..." : "Log In"}
//           <ArrowRight className="w-5 h-5 ml-2" />
//         </button>
//       </form>

//       <div className="mt-6 text-center">
//         <Link href="/signup" className="text-sm font-medium text-blue-900 hover:text-blue-700 hover:underline">
//           Don't have an account? Sign Up
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;


'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LogIn, User, Lock, ArrowRight, AlertCircle, ShieldCheck } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');  // admin | superAdmin
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!username || !password) {
      setError('Please enter email and password.');
      setIsLoading(false);
      return;
    }

    // NEXTAUTH LOGIN
    const result = await signIn('credentials', {
      username,
      password,
      role,
      redirect: false,
    });

    setIsLoading(false);

    // LOGIN FAILURE
    if (result?.error) {
      setError("Login failed. Incorrect credentials or role.");
      console.error("Login Error:", result.error);
      return;
    }

    // LOGIN SUCCESS → Get user info
    try {
      const userRes = await fetch("/api/auth/me");
      const userData = await userRes.json();

      if (userRes.ok) {
        // Store user + token
        localStorage.setItem("user", JSON.stringify(userData.user));
        localStorage.setItem("token", JSON.stringify(userData.token));

        // Redirect based on role
        if (userData.user.role === "superAdmin") {
          router.push("/dashboard/log-analyzer");
        } else {
          router.push(`/dashboard/${userData.user.institution}`);
        }

      } else {
        console.log("Failed to fetch user details");
      }
    } catch (err) {
      console.error("Auth error:", err);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 sm:p-10 border-t-4 border-blue-900">
      
      <div className="flex items-center justify-center mb-6">
        <LogIn className="w-8 h-8 text-blue-900 mr-3" />
        <h2 className="text-3xl font-bold text-gray-900">Log In</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* ROLE DROPDOWN */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Login As
          </label>
          <div className="relative">
            <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="admin">Institutional Admin</option>
              <option value="superAdmin">Super Admin</option>
            </select>
          </div>
        </div>

        {/* EMAIL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="user@institution.edu"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* PASSWORD */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-900 focus:border-blue-900"
            />
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg flex items-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            {error}
          </p>
        )}

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center px-4 py-2 rounded-lg font-medium text-white bg-blue-900 hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {isLoading ? "Authenticating..." : "Log In"}
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </form>

      <div className="mt-6 text-center">
        <Link href="/signup" className="text-sm font-medium text-blue-900 hover:text-blue-700 hover:underline">
          Don't have an account? Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
