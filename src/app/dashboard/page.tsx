// 'use client';

// import React from 'react';
// import Navbar from '../../components/Navbar';
// import Footer from '../../components/Footer';
// import { useSession, signOut } from 'next-auth/react'; // Keep signOut just in case, but rely on Navbar
// import { redirect } from 'next/navigation';
// import { LogOut, LayoutGrid } from 'lucide-react';

// const DashboardPage = () => {
// 	// Access the session state and status
// 	const { data: session, status } = useSession();

// 	if (status === 'loading') {
// 		// Show a loading state while NextAuth verifies the session
// 		return (
// 			<div className="flex justify-center items-center h-screen bg-gray-50">
// 				<p className="text-2xl text-blue-600 animate-pulse">Verifying secure session...</p>
// 			</div>
// 		);
// 	}

// 	// PROTECTION CHECK: If the user is NOT authenticated, redirect them
// 	if (status === 'unauthenticated') {
// 		redirect('/login'); 
// 		return null; // Stop rendering here
// 	}

// 	// User is authenticated
// 	const user = session?.user;

// 	return (
// 		<div>
// 			<Navbar />
// 			<div className="max-w-4xl mx-auto py-16 px-4 min-h-[60vh]">
// 				<h1 className="text-4xl font-bold text-blue-800 mb-6 flex items-center">
// 					<LayoutGrid className="w-8 h-8 mr-3"/> User Dashboard
// 				</h1>
				
// 				<div className="bg-white shadow-xl rounded-lg p-8 border-l-4 border-blue-500">
// 					<h2 className="text-2xl font-semibold text-gray-700 mb-4">
// 						Welcome, {user?.name || user?.email}!
// 					</h2>
// 					<div className="space-y-3 text-lg">
//                         <p>
//                             **Email:** <span className="font-medium">{user?.email || 'N/A'}</span>
//                         </p>
// 						{/* // 🛑 FIX: The 'role' display was removed as the property 
//                             // is not present in the new MySQL schema or NextAuth session.
// 						<p>
// 							**Role:** <span className="font-medium text-indigo-600">{user?.role || 'Student'}</span>
// 						</p> 
//                         */}
// 						<p>
// 							**Institution:** <span className="font-medium">{user?.institution || 'N/A'}</span>
// 						</p>
// 					</div>
					
// 					<div className="mt-8 border-t pt-6 flex justify-between items-center">
// 						<p className="text-gray-500 font-medium">
// 							Your secure eduroam account and session are active. Use the Navbar for navigation.
// 						</p>
// 					</div>
// 				</div>
// 			</div>
// 			<Footer />
// 		</div>
// 	);
// };

// export default DashboardPage;



"use client";

import { useState, useMemo } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
// import Plot from 'react-plotly.js'; // <-- REMOVE THIS LINE
import dynamic from 'next/dynamic'; // <-- ADD THIS LINE
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useSession } from 'next-auth/react'; 
import { redirect } from 'next/navigation';

// --- ADD THIS DYNAMIC IMPORT ---
// This tells Next.js to only load Plotly on the client-side (browser)
// and never on the server. This fixes the 'self is not defined' error.
const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
});

// --- Define Your Data Types ---
type AccessLog = {
  Timestamp: Date;
  Event: string;
  Username: string;
  Source: string;
  Destination: string;
  ServerIP: string;
  Domain?: string;
};
type FticksLog = {
  Timestamp: Date;
  REALM: string;
  VISCOUNTRY: string;
  VISINST: string;
  CSI: string;
  RESULT: string;
  Reason: string;
};
type RoamingLog = FticksLog & { 
  Event?: string;
  Username?: string;
  Source?: string;
  Destination?: string;
  ServerIP?: string;
  MAC?: string | null;
  Access_Match_Type?: string | null;
};

// --- 1. Create a new component for the dashboard UI ---
// --- 1. Create a new component for the dashboard UI ---
function DashboardContent() {
  // --- 1. Data State ---
  const [accessData, setAccessData] = useState<AccessLog[]>([]);
  const [fticksData, setFticksData] = useState<FticksLog[]>([]);
  const [roamingData, setRoamingData] = useState<RoamingLog[]>([]);
  
  // --- 2. UI State ---
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- 3. Filter State ---
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [selectedEvents, setSelectedEvents] = useState<{ value: string, label: string }[]>([]);
  const [selectedDomains, setSelectedDomains] = useState<{ value: string, label: string }[]>([]);

  // --- 4. File Upload Handler (UPDATED WITH BETTER ERROR HANDLING) ---
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append('logFile', file);

    try {
      const res = await fetch('/api/parse-log', {
        method: 'POST',
        body: formData,
      });

      // --- IMPROVED ERROR CHECK ---
      if (!res.ok) {
        // Try to get the error message from the server as text
        const errorText = await res.text();
        // Check if it's the HTML error page
        if (errorText.startsWith('<')) {
          throw new Error(`Server Error (Status ${res.status}): API returned an HTML page. Check server logs for /api/parse-log.`);
        }
        // Otherwise, use the error text from the backend
        throw new Error(errorText || `Failed to parse log (Status ${res.status})`);
      }
      // --- END OF IMPROVEMENT ---

      // If we are here, res.ok was true, so res.json() should work
      const data = await res.json();

      const processedAccessData = data.accessData.map((d: any) => ({
        ...d, 
        Timestamp: new Date(d.Timestamp),
        Domain: d.Username.includes('@') ? d.Username.split('@')[1].toLowerCase() : null,
      }));

      setAccessData(processedAccessData);
      setFticksData(data.fticksData.map((d: any) => ({...d, Timestamp: new Date(d.Timestamp)})));
      setRoamingData(data.roamingData.map((d: any) => ({...d, Timestamp: new Date(d.Timestamp)})));

    } catch (err: any) {
      // This will now show the more helpful error message
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // --- 5. Excel Export Handler ---
  const handleExcelExport = async () => {
    if (!accessData.length) {
      alert("Please parse a log file first.");
      return;
    }
    const res = await fetch('/api/export-excel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessData, fticksData, roamingData }),
    });
    if (!res.ok) {
        alert("Failed to generate Excel file.");
        return;
    }
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Eduroam_Log_Analyzer.xlsx';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };
  
  // --- 6. Memoized Filtering (for performance) ---
  const filteredAccessData = useMemo(() => {
    let data = accessData;
    const [start, end] = dateRange;
    if (start && end) {
      data = data.filter(d => d.Timestamp >= start && d.Timestamp <= end);
    }
    const events = selectedEvents.map(s => s.value);
    if (events.length > 0) {
      data = data.filter(d => events.includes(d.Event));
    }
    const domains = selectedDomains.map(s => s.value);
    if (domains.length > 0) {
      data = data.filter(d => d.Domain && domains.includes(d.Domain));
    }
    return data;
  }, [accessData, dateRange, selectedEvents, selectedDomains]);

  // --- 7. Memoized Filter Options ---
  const eventOptions = useMemo(() => 
    Array.from(new Set(accessData.map(d => d.Event))).map(e => ({ value: e, label: e })), 
    [accessData]
  );
  
  const domainOptions = useMemo(() =>
    Array.from(new Set(accessData.map(d => d.Domain).filter(Boolean)))
      .sort()
      .map(d => ({ value: d!, label: d! })),
    [accessData]
  );

  // --- 8. Memoized Chart Data ---
  const eventDistributionData = useMemo(() => {
    const counts = filteredAccessData.reduce((acc: Record<string, number>, d) => {
      acc[d.Event] = (acc[d.Event] || 0) + 1;
      return acc;
    }, {}); 

    return {
      x: Object.keys(counts),
      y: Object.values(counts),
    };
  }, [filteredAccessData]);

  const authResultData = useMemo(() => {
    const counts = roamingData.reduce((acc: Record<string, number>, d) => {
      const key = d.RESULT || 'Unknown';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(counts),
      values: Object.values(counts),
    };
  }, [roamingData]);

  // --- 9. Helper function to format dates ---
  const formatTimestamp = (date: Date) => {
    if (!date || isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    return date.toISOString().replace('T', ' ').substring(0, 19);
  };

  // --- 10. THE VIEW (What to render) ---
  return (
    <div className="flex flex-1 w-full overflow-hidden">
      {/* === SIDEBAR (Filters) === */}
      <aside className="w-1/8 p-4 space-y-4 overflow-y-auto bg-gray-50 border-r border-gray-200 text-gray-600">
        <h3 className="text-lg font-semibold">🗂 Upload Log File</h3>
        <input 
          type="file" 
          onChange={handleFileUpload} 
          accept=".log,.txt" 
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {isLoading && <div className="p-2 text-blue-700">⏳ Parsing file...</div>}
        {error && <div className="p-2 text-red-500 font-bold">{error}</div>}
        <hr className="my-4"/>
        <h3 className="text-lg font-semibold">🔍 Filter Access Logs</h3>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Select Date Range</label>
          <DatePicker
            selectsRange={true}
            startDate={dateRange[0]}
            endDate={dateRange[1]}
            onChange={(update) => setDateRange(update as [Date | null, Date | null])}
            isClearable={true}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Access Event Types</label>
          <Select
            isMulti
            options={eventOptions}
            value={selectedEvents}
            onChange={(selected) => setSelectedEvents(selected as any)}
            className="w-full"
            placeholder="All events"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Filter by Domain</label>
          <Select
            isMulti
            options={domainOptions}
            value={selectedDomains}
            onChange={(selected) => setSelectedDomains(selected as any)}
            className="w-full"
            placeholder="All domains"
          />
        </div>
        <hr className="my-4"/>
        <button 
          onClick={handleExcelExport} 
          className="w-full p-2 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
          disabled={accessData.length === 0 || isLoading}
        >
          Generate Excel Report
        </button>
      </aside>

      {/* === MAIN CONTENT (Charts & Tables) === */}
      <main className="w-7/8 p-16 overflow-y-auto bg-white">
        <h1 className="text-3xl font-bold text-gray-800">📡 Eduroam Log Dashboard</h1>
        {accessData.length === 0 && !isLoading && (
          <div className="p-6 mt-4 text-center text-gray-500 bg-gray-100 rounded-lg">
            Please upload a log file to start.
          </div>
        )}
        {filteredAccessData.length > 0 && (
          <div className="mt-4 space-y-6">
            {/* Enhanced Roaming Logs Table */}
            <h2 className="text-2xl font-semibold text-gray-700">✈️ Enhanced Roaming Logs</h2>
            <div className="w-full overflow-x-auto rounded-lg border border-gray-200 shadow-sm mt-2 max-h-96">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold text-gray-600">Timestamp</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-600">Username</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-600">Event</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-600">RESULT</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-600">Source</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-600">Destination</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-600">ServerIP</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-600">MAC</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-600">Home Country</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-600">Home University</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-600">Visiting Country</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-600">Visiting University</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-600">CSI</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-600">Match Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white text-gray-600">
                  {roamingData.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-2 whitespace-nowrap">{formatTimestamp(row.Timestamp)}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{row.Username}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{row.Event}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{row.RESULT}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{row.Source}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{row.Destination}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{row.ServerIP}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{row.MAC || 'None'}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{row.REALM?.toLowerCase().endsWith('.in') ? 'IN' : 'Foreign'}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{row.REALM}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{row.VISCOUNTRY}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{row.VISINST}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{row.CSI}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{row.Access_Match_Type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Access Logs Table */}
            <h2 className="text-2xl font-semibold text-gray-700">🔐 Access Logs (Filtered)</h2>
            <div className="w-full overflow-x-auto rounded-lg border border-gray-200 shadow-sm mt-2 max-h-96">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold text-gray-600">Timestamp</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-600">Username</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-600">Event</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-600">Source</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-600">Destination</th>
                    <th className="px-4 py-2 text-left font-Bolds text-gray-600">ServerIP</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-600">Domain</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white text-gray-600">
                  {filteredAccessData.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-2 whitespace-nowrap">{formatTimestamp(row.Timestamp)}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{row.Username}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{row.Event}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{row.Source}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{row.Destination}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{row.ServerIP}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{row.Domain}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Charts */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="w-full p-4 border border-gray-200 rounded-lg shadow-sm">
                <h4 className="font-bold">Event Type Distribution</h4>
                <Plot
                  data={[{
                    x: eventDistributionData.x,
                    y: eventDistributionData.y,
                    type: 'bar',
                    marker: { color: '#3b82f6' }
                  }]}
                  layout={{ title: { text: 'Event Distribution' } }}
                  useResizeHandler={true}
                  className="w-full h-96"
                />
              </div>
              <div className="w-full p-4 border border-gray-200 rounded-lg shadow-sm">
                <h4 className="font-bold">Auth Result Distribution (Roaming)</h4>
                  <Plot
                  data={[{
                    labels: authResultData.labels,
                    values: authResultData.values,
                    type: 'pie'
                  }]}
                  layout={{ title: { text: 'Auth Results' } }}
                  useResizeHandler={true}
                  className="w-full h-96"
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
// (The rest of your file, DashboardPage, stays exactly the same)


// --- 2. This is now your main page component ---
// It only handles auth and layout.
export default function DashboardPage() {
  
  // --- A. SESSION PROTECTION ---
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-2xl text-blue-600 animate-pulse">Verifying secure session...</p>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    redirect('/login');
    return null; // Stop rendering here
  }
  
  // --- B. RENDER THE LAYOUT AND THE DASHBOARD ---
  // If we are here, status is 'authenticated'
  return (
    <div className="flex flex-col w-full min-h-screen font-sans">
      <Navbar />
      
      {/* All the dashboard logic is now safely inside this component */}
      <DashboardContent />
      
      <Footer />
    </div>
  );
}