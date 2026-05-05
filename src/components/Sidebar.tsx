'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Import, Settings, Database, BarChart3 } from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: '분석 대시보드', href: '/' },
  { icon: Import, label: '데이터 임포트', href: '/import' },
  { icon: Database, label: '배출계수 관리', href: '/coefficients' },
  { icon: Settings, label: '설정', href: '/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside style={{
      width: '260px',
      height: '100vh',
      backgroundColor: 'var(--card)',
      borderRight: '1px solid var(--border)',
      padding: '2rem 1rem',
      position: 'fixed',
      left: 0,
      top: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem'
    }}>
      <div style={{ padding: '0 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ 
          width: '32px', 
          height: '32px', 
          backgroundColor: 'var(--primary)', 
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white'
        }}>
          <BarChart3 size={20} />
        </div>
        <span style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.025em' }}>Hanaloop</span>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                color: isActive ? 'var(--primary)' : 'var(--muted)',
                backgroundColor: isActive ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                fontWeight: isActive ? 600 : 500,
                transition: 'all 0.2s ease',
                textDecoration: 'none'
              }}
            >
              <item.icon size={20} />
              <span style={{ fontSize: '0.95rem' }}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
