'use client';

import React, { ReactNode } from 'react';

interface DashboardLayoutProps {
  mainContent: ReactNode;
  sidebarContent: ReactNode;
}

export default function DashboardLayout({ mainContent, sidebarContent }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <div className="flex h-screen overflow-hidden">
        {/* Main Content Area - 70% */}
        <div className="w-70p overflow-y-auto border-r border-border">
          <div className="p-6">{mainContent}</div>
        </div>

        {/* Sidebar - 30% */}
        <div className="w-30p overflow-y-auto bg-surface/10 backdrop-blur-sm">
          <div className="p-6 space-y-6">{sidebarContent}</div>
        </div>
      </div>
    </div>
  );
}
