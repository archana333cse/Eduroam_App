
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



"use client";

import React, { useEffect, useState } from "react";

export default function InstituteDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Prevent hydration errors — localStorage is only available in client
    if (typeof window === "undefined") return;

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-blue-800 text-lg">
        Loading institute dashboard…
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 text-red-600 font-semibold">
        No user data found. Please log in again.
      </div>
    );
  }

  return (
    <div className="mt-10 p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold text-blue-900">
        Institute Dashboard – {(user?.institution || "Unknown").toUpperCase()}
      </h2>

      <p className="text-gray-600 mt-3">
        You are logged in as: <strong>{user.email}</strong>
      </p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="p-6 bg-blue-100 shadow rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900">Your Tickets</h3>
          <p className="text-gray-700 mt-2">
            View and manage tickets raised by your institute.
          </p>
        </div>

        <div className="p-6 bg-blue-100 shadow rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900">
            Institute Profile
          </h3>
          <p className="text-gray-700 mt-2">
            Name: {user.name || "N/A"} <br />
            Institution: {user.institution}
          </p>
        </div>

        <div className="p-6 bg-blue-100 shadow rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900">Tools</h3>
          <p className="text-gray-700 mt-2">
            Diagnostics & troubleshooting tools.
          </p>
        </div>

      </div>
    </div>
  );
}
