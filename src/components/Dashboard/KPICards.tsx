'use client';

import React from 'react';
import { Leaf, Zap, Box, Truck, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface CardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend: string;
  trendType: 'up' | 'down';
  iconBg: string;
  iconColor: string;
}

function Card({ icon, label, value, trend, trendType, iconBg, iconColor }: CardProps) {
  return (
    <div style={{ 
      background: 'var(--card)', 
      border: '1px solid var(--border)', 
      borderRadius: '16px', 
      padding: '1.5rem',
      boxShadow: 'var(--shadow)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ padding: '0.5rem', background: iconBg, color: iconColor, borderRadius: '8px', display: 'flex', alignItems: 'center' }}>{icon}</div>
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

export default function KPICards() {
  return (
    <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
      <Card icon={<Leaf size={20} />} label="Total PCF (YTD)" value="8,245.3 kgCO₂e" trend="-12%" trendType="down" iconBg="#ecfdf5" iconColor="#059669" />
      <Card icon={<Zap size={20} />} label="Energy Intensity" value="0.45 kg/unit" trend="+4.2%" trendType="up" iconBg="#eff6ff" iconColor="#2563eb" />
      <Card icon={<Box size={20} />} label="Material Usage" value="5,240 kg" trend="-8.5%" trendType="down" iconBg="#fffbeb" iconColor="#d97706" />
      <Card icon={<Truck size={20} />} label="Logistics Impact" value="1,420 kgCO₂e" trend="-15%" trendType="down" iconBg="#fef2f2" iconColor="#dc2626" />
    </section>
  );
}
