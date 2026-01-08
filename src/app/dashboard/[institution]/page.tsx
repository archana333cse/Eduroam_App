// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function InstituteDashboardPage({ params }: any) {
//   const router = useRouter();
//   const institution = params.institution; // dynamic param
//   const [user, setUser] = useState<any>(null);

//   useEffect(() => {
//     // Load user from localStorage
//     const storedUser = localStorage.getItem("user");

//     if (!storedUser) {
//       router.push("/login");
//       return;
//     }

//     const parsed = JSON.parse(storedUser);
//     setUser(parsed);

//     // Only institutional admin allowed
//     if (parsed.role !== "admin") {
//       router.push("/dashboard/super");
//       return;
//     }

//     // Block mismatched institute access
//     if (parsed.institution !== institution) {
//       router.push(`/dashboard/${parsed.institution}`);
//       return;
//     }
//   }, [institution, router]);

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-white text-xl">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-blue-50 p-10">
//       <h1 className="text-4xl font-bold text-blue-900">
//         Welcome, {user.name || user.email}
//       </h1>

//       <h2 className="text-2xl mt-4 text-blue-700">
//         Institutional Dashboard: {institution.toUpperCase()}
//       </h2>

//       <p className="mt-4 text-gray-700">
//         This is your institute-specific dashboard.
//       </p>

//       {/* Add widgets later */}
//       <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="p-6 bg-white shadow rounded-lg">
//           <h3 className="text-lg font-semibold text-blue-900">Tickets</h3>
//           <p className="text-gray-600 mt-2">Manage your support tickets.</p>
//         </div>

//         <div className="p-6 bg-white shadow rounded-lg">
//           <h3 className="text-lg font-semibold text-blue-900">User Details</h3>
//           <p className="text-gray-600 mt-2">Your institute profile.</p>
//         </div>

//         <div className="p-6 bg-white shadow rounded-lg">
//           <h3 className="text-lg font-semibold text-blue-900">Support Tools</h3>
//           <p className="text-gray-600 mt-2">Resolve connectivity issues.</p>
//         </div>
//       </div>
//     </div>
//   );
// }


// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function InstituteDashboardPage({ params }: any) {
//   const router = useRouter();
//   const institution = params.institution;
//   const [user, setUser] = useState<any>(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");

//     // Not logged in → redirect immediately
//     if (!storedUser) {
//       router.push("/login");
//       return;
//     }

//     const parsed = JSON.parse(storedUser);
//     setUser(parsed);

//     // ❌ SuperAdmin should NEVER access institute dashboard
//     if (parsed.role === "superAdmin") {
//       router.push("/dashboard/log-analyzer");
//       return;
//     }

//     // ❌ Normal admin but wrong institute → redirect to their correct dashboard
//     if (parsed.role === "admin" && parsed.institution !== institution) {
//       router.push(`/dashboard/${parsed.institution}`);
//       return;
//     }
//   }, [institution, router]);

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-white text-xl">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-blue-50 p-10">
//       <h1 className="text-4xl font-bold text-blue-900">
//         Welcome, {user.name || user.email}
//       </h1>

//       <h2 className="text-2xl mt-4 text-blue-700">
//         Institutional Dashboard: {institution.toUpperCase()}
//       </h2>

//       <p className="mt-4 text-gray-700">
//         This is your institute-specific dashboard.
//       </p>

//       <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="p-6 bg-white shadow rounded-lg">
//           <h3 className="text-lg font-semibold text-blue-900">Tickets</h3>
//           <p className="text-gray-600 mt-2">Manage your support tickets.</p>
//         </div>

//         <div className="p-6 bg-white shadow rounded-lg">
//           <h3 className="text-lg font-semibold text-blue-900">User Details</h3>
//           <p className="text-gray-600 mt-2">Your institute profile.</p>
//         </div>

//         <div className="p-6 bg-white shadow rounded-lg">
//           <h3 className="text-lg font-semibold text-blue-900">Support Tools</h3>
//           <p className="text-gray-600 mt-2">Resolve connectivity issues.</p>
//         </div>
//       </div>
//     </div>
//   );
// }


// src/app/login/page.tsx



// import React from 'react';
// import Navbar from '../../../components/Navbar'; // Adjust path if necessary
// import Footer from '../../../components/Footer'; // Adjust path if necessary
// // import InstituteDashboard from '../../components/InstituteDashboard';
// import InstituteDashboard from "../../../components/InstituteDashboard";

// // Note: Ensure the paths above match your file structure. 
// // Based on the image, the path '../../components/' should be correct 
// // because 'login' is inside 'app', and 'components' is outside 'app'.

// const LoginPage = () => {
//   return (
//     <div>
//       <Navbar />
//       {/* The main content area where the form will be centered */}
//       <main className="flex justify-center items-center min-h-[70vh] bg-gray-50 p-8">
//         <InstituteDashboard />
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default LoginPage;


"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Always import components using alias @
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InstituteDashboard from "@/components/InstituteDashboard";

export default function InstituteDashboardPage({ params }: any) {
  const router = useRouter();
  const institution = params.institution;

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.push("/login");
      return;
    }

    const parsed = JSON.parse(storedUser);

    // Missing data = invalid session → logout
    if (!parsed?.role || !parsed?.institution) {
      router.push("/login");
      return;
    }

    // Only institutional admin allowed
    if (parsed.role !== "admin") {
      router.push("/dashboard/super");
      return;
    }

    // Prevent access to other institutes
    if (parsed.institution !== institution) {
      router.push(`/dashboard/${parsed.institution}`);
      return;
    }

    setUser(parsed);
    setLoading(false);
  }, [institution, router]);

  // Loading screen
  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-blue-800">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="p-10 bg-blue-50 min-h-[70vh]">
        <h1 className="text-4xl font-bold text-blue-900">
          Welcome, {user.name || user.email}
        </h1>

        <h2 className="text-2xl mt-4 text-blue-700">
          Institutional Dashboard: {user.institution.toUpperCase()}
        </h2>

        <p className="mt-4 text-gray-700">
          This is your institute-specific dashboard.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white shadow rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900">Tickets</h3>
            <p className="text-gray-600 mt-2">
              Manage and track your support tickets.
            </p>
          </div>

          <div className="p-6 bg-white shadow rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900">User Details</h3>
            <p className="text-gray-600 mt-2">
              View your institute profile and user information.
            </p>
          </div>

          <div className="p-6 bg-white shadow rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900">Support Tools</h3>
            <p className="text-gray-600 mt-2">
              Tools to resolve authentication and connectivity issues.
            </p>
          </div>
        </div>

        {/* This will display the real dashboard UI */}
        <div className="mt-12">
          <InstituteDashboard />
        </div>
      </main>

      <Footer />
    </div>
  );
}

