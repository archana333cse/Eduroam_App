
// import { NextRequest, NextResponse } from 'next/server';
// import { Readable } from 'stream';

// // --- JS Regex Equivalents ---
// const accessPattern =
//   /(\w{3}\s\w{3}\s\d+\s\d{2}:\d{2}:\d{2}\s\d{4}):\s*(Access-(?:Accept|Reject))\s+for\s+user\s+([\w@.\-]+)\s+from\s+([\w._\-]+)\s+to\s+([\w._\-]+)\s*\(([\d.]+)\)/i;
// const fticksPattern =
//   /(\w{3}\s\w{3}\s\d+\s\d{2}:\d{2}:\d{2}\s\d{4}):\s*F-TICKS\/eduroam\/1\.0#REALM=([^#]*)#VISCOUNTRY=([^#]*)#VISINST=([^#]*)#CSI=([^#]*)#RESULT=([^#]*)#/i;

// // --- Define Data Types ---
// type AccessLog = {
//   Timestamp: Date;
//   Event: string;
//   Username: string;
//   Source: string;
//   Destination: string;
//   ServerIP: string;
// };

// type FticksLog = {
//   Timestamp: Date;
//   REALM: string;
//   VISCOUNTRY: string;
//   VISINST: string;
//   CSI: string;
//   RESULT: string;
//   Reason: string;
// };

// // --- Helper to read stream line-by-line ---
// async function* readLines(stream: ReadableStream<Uint8Array>) {
//   const reader = stream.getReader();
//   const decoder = new TextDecoder();
//   let buffer = '';

//   try {
//     while (true) {
//       const { done, value } = await reader.read();
//       if (done) break;

//       buffer += decoder.decode(value, { stream: true });
//       const lines = buffer.split('\n');
//       buffer = lines.pop() || ''; // Keep the last (potentially partial) line

//       for (const line of lines) {
//         yield line;
//       }
//     }
//     if (buffer) {
//       yield buffer; // Yield any remaining part
//     }
//   } finally {
//     reader.releaseLock();
//   }
// }

// // --- The API Route Handler ---
// export async function POST(req: NextRequest) {
//   try {
//     const formData = await req.formData();
//     const file = formData.get('logFile') as File;

//     if (!file) {
//       return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
//     }

//     const accessData: AccessLog[] = [];
//     const fticksData: FticksLog[] = [];
//     const fileStream = file.stream();

//     // 1. --- Stream and Parse the file ---
//     for await (const line of readLines(fileStream)) {
//       // Check for Access logs
//       const accessMatch = line.match(accessPattern);
//       if (accessMatch) {
//         accessData.push({
//           Timestamp: new Date(accessMatch[1]),
//           Event: accessMatch[2],
//           Username: accessMatch[3],
//           Source: accessMatch[4],
//           Destination: accessMatch[5],
//           ServerIP: accessMatch[6],
//         });
//         continue; // Move to next line
//       }

//       // Check for F-TICKS logs
//       const fticksMatch = line.match(fticksPattern);
//       if (fticksMatch) {
//         const result = fticksMatch[6].trim();
//         fticksData.push({
//           Timestamp: new Date(fticksMatch[1]),
//           REALM: fticksMatch[2].trim(),
//           VISCOUNTRY: fticksMatch[3].trim(),
//           VISINST: fticksMatch[4].trim(),
//           CSI: fticksMatch[5].trim(),
//           RESULT: result,
//           Reason: result.toUpperCase() === 'OK' ? 'Authentication successful' : 'Authentication failed',
//         });
//       }
//     }

//     // 2. --- Merge the Data (JS version of merge_access_fticks_data) ---
//     const roamingData = mergeAccessAndFticks(accessData, fticksData);

//     // 3. --- Send all data to the client ---
//     return NextResponse.json({ 
//       accessData, 
//       fticksData,
//       roamingData // Send the pre-merged data
//     });

//   } catch (error: any) {
//     console.error("Error in /api/parse-log:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// // --- JavaScript implementation of your merge logic ---
// function mergeAccessAndFticks(accessData: AccessLog[], fticksData: FticksLog[]) {
//   if (!accessData.length || !fticksData.length) {
//     return fticksData; // Return original fticks if nothing to merge
//   }

//   // 1. Pre-process access data for fast lookups
//   const accessEnriched = accessData.map(log => ({
//     ...log,
//     Username_Lower: log.Username.toLowerCase().trim(),
//     Domain: log.Username.match(/@(.+)/)?.[1].toLowerCase(),
//     timeMs: log.Timestamp.getTime(), // Use timestamp in ms for easy comparison
//   })).sort((a, b) => a.timeMs - b.timeMs); // Sort by time

//   const timeWindowMs = 5 * 60 * 1000; // 5 minutes

//   // 2. Iterate F-TICKS logs and find matches
//   const mergedData = fticksData.map(fticksRow => {
//     const fticksTime = fticksRow.Timestamp.getTime();
//     if (isNaN(fticksTime)) {
//       return { ...fticksRow, Access_Match_Type: null }; // Invalid timestamp
//     }
    
//     const realm_lower = fticksRow.REALM.toLowerCase().trim();
//     const realm_username = realm_lower.match(/^([^@]+)@/)?.[1];
//     const realm_domain = realm_lower.match(/@(.+)/)?.[1];

//     // Find all access logs within the time window
//     const timeFiltered = accessEnriched.filter(accessRow => {
//       return accessRow.timeMs >= (fticksTime - timeWindowMs) && 
//              accessRow.timeMs <= (fticksTime + timeWindowMs);
//     });

//     if (timeFiltered.length === 0) {
//       return { ...fticksRow, Access_Match_Type: null }; // No match found
//     }

//     let matchedAccess: AccessLog | null = null;
//     let matchType: string | null = null;

//     // Strategy 1: Exact REALM Match
//     if (realm_lower.includes('@')) {
//       const exactMatch = timeFiltered.find(r => r.Username_Lower === realm_lower);
//       if (exactMatch) {
//         matchedAccess = exactMatch;
//         matchType = "Exact_REALM_Match";
//       }
//     }

//     // Strategy 2: Username Part Match
//     if (!matchedAccess && realm_username) {
//       const usernameMatch = timeFiltered.find(r => r.Username_Lower.startsWith(realm_username));
//       if (usernameMatch) {
//         matchedAccess = usernameMatch;
//         matchType = "Username_Part_Match";
//       }
//     }

//     // Strategy 3: Domain-based Matching
//     if (!matchedAccess && realm_domain) {
//       const domainMatches = timeFiltered.filter(r => r.Domain === realm_domain);
//       if (domainMatches.length > 0) {
//         // Get closest time match from this subset
//         matchedAccess = domainMatches.reduce((prev, curr) => 
//           Math.abs(curr.timeMs - fticksTime) < Math.abs(prev.timeMs - fticksTime) ? curr : prev
//         );
//         matchType = "Domain_Match";
//       }
//     }

//     // Strategy 4: Closest Time Match (Fallback)
//     if (!matchedAccess) {
//       matchedAccess = timeFiltered.reduce((prev, curr) => 
//         Math.abs(curr.timeMs - fticksTime) < Math.abs(prev.timeMs - fticksTime) ? curr : prev
//       );
//       matchType = "Time_Proximity_Match";
//     }

//     // 3. Apply matched data
//     if (matchedAccess) {
//       return {
//         ...fticksRow,
//         Event: matchedAccess.Event,
//         Username: matchedAccess.Username,
//         Source: matchedAccess.Source,
//         Destination: matchedAccess.Destination,
//         ServerIP: matchedAccess.ServerIP,
//         MAC: (matchedAccess.Source.match(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/)) ? matchedAccess.Source : null,
//         Access_Match_Type: matchType,
//       };
//     } else {
//       return { ...fticksRow, Access_Match_Type: "No_Match_Found" };
//     }
//   });

//   return mergedData;
// }


import { NextRequest, NextResponse } from 'next/server';
import { Readable } from 'stream';

// --- CONFIGURATION TO INCREASE UPLOAD SIZE LIMIT ---
// This is the fix for the "413 Payload Too Large" error.
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Increase the limit to 10mb
    },
  },
};

// --- JS Regex Equivalents ---
const accessPattern =
  /(\w{3}\s\w{3}\s\d+\s\d{2}:\d{2}:\d{2}\s\d{4}):\s*(Access-(?:Accept|Reject))\s+for\s+user\s+([\w@.\-]+)\s+from\s+([\w._\-]+)\s+to\s+([\w._\-]+)\s*\(([\d.]+)\)/i;
const fticksPattern =
  /(\w{3}\s\w{3}\s\d+\s\d{2}:\d{2}:\d{2}\s\d{4}):\s*F-TICKS\/eduroam\/1\.0#REALM=([^#]*)#VISCOUNTRY=([^#]*)#VISINST=([^#]*)#CSI=([^#]*)#RESULT=([^#]*)#/i;

// --- Define Data Types ---
type AccessLog = {
  Timestamp: Date;
  Event: string;
  Username: string;
  Source: string;
  Destination: string;
  ServerIP: string;
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

// --- Helper to read stream line-by-line ---
async function* readLines(stream: ReadableStream<Uint8Array>) {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || ''; // Keep the last (potentially partial) line

      for (const line of lines) {
        yield line;
      }
    }
    if (buffer) {
      yield buffer; // Yield any remaining part
    }
  } finally {
    reader.releaseLock();
  }
}

// --- The API Route Handler ---
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('logFile') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const accessData: AccessLog[] = [];
    const fticksData: FticksLog[] = [];
    const fileStream = file.stream();

    // 1. --- Stream and Parse the file ---
    for await (const line of readLines(fileStream)) {
      // Check for Access logs
      const accessMatch = line.match(accessPattern);
      if (accessMatch) {
        accessData.push({
          Timestamp: new Date(accessMatch[1]),
          Event: accessMatch[2],
          Username: accessMatch[3],
          Source: accessMatch[4],
          Destination: accessMatch[5],
          ServerIP: accessMatch[6],
        });
        continue; // Move to next line
      }

      // Check for F-TICKS logs
      const fticksMatch = line.match(fticksPattern);
      if (fticksMatch) {
        const result = fticksMatch[6].trim();
        fticksData.push({
          Timestamp: new Date(fticksMatch[1]),
          REALM: fticksMatch[2].trim(),
          VISCOUNTRY: fticksMatch[3].trim(),
          VISINST: fticksMatch[4].trim(),
          CSI: fticksMatch[5].trim(),
          RESULT: result,
          Reason: result.toUpperCase() === 'OK' ? 'Authentication successful' : 'Authentication failed',
        });
      }
    }

    // 2. --- Merge the Data (JS version of merge_access_fticks_data) ---
    const roamingData = mergeAccessAndFticks(accessData, fticksData);

    // 3. --- Send all data to the client ---
    return NextResponse.json({ 
      accessData, 
      fticksData,
      roamingData // Send the pre-merged data
    });

  } catch (error: any) {
    console.error("Error in /api/parse-log:", error);
    // Add more detail to the error message
    return NextResponse.json({ error: `An error occurred on the server: ${error.message}` }, { status: 500 });
  }
}

// --- JavaScript implementation of your merge logic ---
function mergeAccessAndFticks(accessData: AccessLog[], fticksData: FticksLog[]) {
  if (!accessData.length || !fticksData.length) {
    return fticksData; // Return original fticks if nothing to merge
  }

  // 1. Pre-process access data for fast lookups
  const accessEnriched = accessData.map(log => ({
    ...log,
    Username_Lower: log.Username.toLowerCase().trim(),
    Domain: log.Username.match(/@(.+)/)?.[1].toLowerCase(),
    timeMs: log.Timestamp.getTime(), // Use timestamp in ms for easy comparison
  })).sort((a, b) => a.timeMs - b.timeMs); // Sort by time

  const timeWindowMs = 5 * 60 * 1000; // 5 minutes

  // 2. Iterate F-TICKS logs and find matches
  const mergedData = fticksData.map(fticksRow => {
    const fticksTime = fticksRow.Timestamp.getTime();
    if (isNaN(fticksTime)) {
      return { ...fticksRow, Access_Match_Type: null }; // Invalid timestamp
    }
    
    const realm_lower = fticksRow.REALM.toLowerCase().trim();
    const realm_username = realm_lower.match(/^([^@]+)@/)?.[1];
    const realm_domain = realm_lower.match(/@(.+)/)?.[1];

    // Find all access logs within the time window
    const timeFiltered = accessEnriched.filter(accessRow => {
      return accessRow.timeMs >= (fticksTime - timeWindowMs) && 
             accessRow.timeMs <= (fticksTime + timeWindowMs);
    });

    if (timeFiltered.length === 0) {
      return { ...fticksRow, Access_Match_Type: null }; // No match found
    }

    let matchedAccess: any | null = null;
    let matchType: string | null = null;

    // Strategy 1: Exact REALM Match
    if (realm_lower.includes('@')) {
      const exactMatch = timeFiltered.find(r => r.Username_Lower === realm_lower);
      if (exactMatch) {
        matchedAccess = exactMatch;
        matchType = "Exact_REALM_Match";
      }
    }

    // Strategy 2: Username Part Match
    if (!matchedAccess && realm_username) {
      const usernameMatch = timeFiltered.find(r => r.Username_Lower.startsWith(realm_username));
      if (usernameMatch) {
        matchedAccess = usernameMatch;
        matchType = "Username_Part_Match";
      }
    }

    // Strategy 3: Domain-based Matching
    if (!matchedAccess && realm_domain) {
      const domainMatches = timeFiltered.filter(r => r.Domain === realm_domain);
      if (domainMatches.length > 0) {
        // Get closest time match from this subset
        matchedAccess = domainMatches.reduce((prev, curr) => 
          Math.abs(curr.timeMs - fticksTime) < Math.abs(prev.timeMs - fticksTime) ? curr : prev
        );
        matchType = "Domain_Match";
      }
    }

    // Strategy 4: Closest Time Match (Fallback)
    if (!matchedAccess) {
      matchedAccess = timeFiltered.reduce((prev, curr) => 
        Math.abs(curr.timeMs - fticksTime) < Math.abs(prev.timeMs - fticksTime) ? curr : prev
      );
      matchType = "Time_Proximity_Match";
    }

    // 3. Apply matched data
    if (matchedAccess) {
      return {
        ...fticksRow,
        Event: matchedAccess.Event,
        Username: matchedAccess.Username,
        Source: matchedAccess.Source,
        Destination: matchedAccess.Destination,
        ServerIP: matchedAccess.ServerIP,
        MAC: (matchedAccess.Source.match(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/)) ? matchedAccess.Source : null,
        Access_Match_Type: matchType,
      };
    } else {
      return { ...fticksRow, Access_Match_Type: "No_Match_Found" };
    }
  });

  return mergedData;
}
