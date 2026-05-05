'use client';

import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Leaf, Zap, Box, Truck, ArrowUpRight, ArrowDownRight, Info } from 'lucide-react';
import { mockDashboardData, emissionFactors } from '@/lib/data';

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
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <Card icon={<Leaf size={20} />} label="Total PCF (YTD)" value="8,245.3 kgCO₂e" trend="-12%" trendType="down" iconBg="#ecfdf5" iconColor="#059669" />
        <Card icon={<Zap size={20} />} label="Energy Intensity" value="0.45 kg/unit" trend="+4.2%" trendType="up" iconBg="#eff6ff" iconColor="#2563eb" />
        <Card icon={<Box size={20} />} label="Material Usage" value="5,240 kg" trend="-8.5%" trendType="down" iconBg="#fffbeb" iconColor="#d97706" />
        <Card icon={<Truck size={20} />} label="Logistics Impact" value="1,420 kgCO₂e" trend="-15%" trendType="down" iconBg="#fef2f2" iconColor="#dc2626" />
      </section>

      {/* Charts and Tables */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <div style={{ 
          background: 'var(--card)', 
          border: '1px solid var(--border)', 
          borderRadius: '20px', 
          padding: '2rem',
          boxShadow: 'var(--shadow)'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '2rem' }}>Monthly Emission Trends</h3>
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockDashboardData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }} dx={-10} />
                <Tooltip 
                  contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', boxShadow: 'var(--shadow)' }}
                  cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="electricity" name="Electricity" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
                <Bar dataKey="rawMaterials" name="Raw Materials" stackId="a" fill="#6366f1" radius={[0, 0, 0, 0]} />
                <Bar dataKey="transportation" name="Transportation" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ 
            background: 'var(--card)', 
            border: '1px solid var(--border)', 
            borderRadius: '16px', 
            padding: '1.5rem',
            boxShadow: 'var(--shadow)'
          }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Info size={18} /> Emission Factors
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {emissionFactors.map((ef, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: i < emissionFactors.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>{ef.category}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{ef.source}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--primary)' }}>{ef.factor}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{ef.unit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ 
            background: 'var(--primary)', 
            borderRadius: '16px', 
            padding: '1.5rem',
            color: 'white',
            boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.3)'
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>AI Insight</h3>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, opacity: 0.9 }}>
              Switching to renewable energy sources for production line B could reduce your overall carbon footprint by another 12% by Q4.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function Card({ icon, label, value, trend, trendType, iconBg, iconColor }: any) {
  return (
    <div style={{ 
      background: 'var(--card)', 
      border: '1px solid var(--border)', 
      borderRadius: '16px', 
      padding: '1.5rem',
      boxShadow: 'var(--shadow)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ padding: '0.5rem', background: iconBg, color: iconColor, borderRadius: '8px' }}>{icon}</div>
        <span style={{ 
          color: trendType === 'down' ? '#059669' : '#dc2626', 
          fontSize: '0.875rem', 
          fontWeight: 600, 
          display: 'flex', 
          alignItems: 'center' 
        }}>
          {trendType === 'down' ? <ArrowDownRight size={16} /> : <ArrowUpRight size={16} />} {trend}
        </span>
      </div>
      <p style={{ color: 'var(--muted)', fontSize: '0.875rem', fontWeight: 500 }}>{label}</p>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '0.25rem' }}>{value}</h2>
    </div>
  );
}
