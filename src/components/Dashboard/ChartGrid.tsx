'use client';

import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Info } from 'lucide-react';
import { mockDashboardData, emissionFactors } from '@/lib/data';

export default function ChartGrid() {
  return (
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
  );
}
