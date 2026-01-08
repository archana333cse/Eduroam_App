// This file is at: /opt/eduroam/frontend/src/app/dashboard/log-analyzer/page.tsx

"use client"; // Required for iframes, as they are client-side elements

import React from 'react';

export default function LogAnalyzerPage() {
  return (
    <div style={{ width: '100%', height: 'calc(100vh - 100px)' }}>
      {/* You can adjust the h1 or remove it */}
      <h1 style={{ padding: '20px', fontSize: '1.5rem', fontWeight: '600' }}>
        Eduroam Log Analyzer
      </h1>

      <iframe
        src="/log-analyzer/" // This is the Nginx path we created
        width="100%"
        height="100%" // The iframe will fill the container div
        style={{ border: 'none', borderRadius: '8px' }}
        title="Eduroam Log Analyzer Dashboard"
      />
    </div>
  );
}