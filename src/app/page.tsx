'use client';

import React from 'react';
import KPICards from '@/components/Dashboard/KPICards';
import ChartGrid from '@/components/Dashboard/ChartGrid';

export default function Dashboard() {
  return (
    <main className="container fade-in" style={{ padding: '2rem 1.5rem' }}>
      <header style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: '0.5rem' }}>
            PCF Dashboard
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1.1rem' }}>
            Real-time monitoring of Product Carbon Footprint (PCF).
          </p>
        </div>
        <div>
          <button style={{ 
            background: 'var(--primary)', 
            color: 'white', 
            padding: '0.75rem 1.5rem', 
            borderRadius: '8px', 
            border: 'none', 
            fontWeight: 600, 
            cursor: 'pointer',
            boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.4)'
          }}>
            Download Report
          </button>
        </div>
      </header>

      {/* KPI Cards */}
      <KPICards />

      {/* Charts and Tables */}
      <ChartGrid />
    </main>
  );
}
