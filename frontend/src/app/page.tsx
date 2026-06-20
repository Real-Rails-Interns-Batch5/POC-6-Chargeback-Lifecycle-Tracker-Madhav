'use client';

import React, { useState, useCallback } from 'react';
import { AlertCircle, Users } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import SidebarInsight from '@/components/SidebarInsight';
import FiltersPanel from '@/components/FiltersPanel';
import StatsVisualization from '@/components/StatsVisualization';
import CaseTimeline from '@/components/CaseTimeline';
import CasesTable from '@/components/CasesTable';
import { useCases, useStats, useDisputeOutcomes } from '@/hooks/useData';
import { api } from '@/lib/api';
import type { FilterState, ChargebackCase } from '@/types/index';

export default function HomePage() {
  const [filters, setFilters] = useState<FilterState>({});
  const [selectedCase, setSelectedCase] = useState<ChargebackCase | null>(null);
  const [downloadLoading, setDownloadLoading] = useState(false);

  const { cases, loading: casesLoading } = useCases(filters);
  const { stats, loading: statsLoading } = useStats();
  const { outcomes, loading: outcomesLoading } = useDisputeOutcomes();

  const handleDownload = useCallback(async () => {
    try {
      setDownloadLoading(true);
      const data = await api.downloadSampleData();

      if (data && !data.error) {
        // Create downloadable JSON file
        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `chargeback-sample-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setDownloadLoading(false);
    }
  }, []);

  const caseToDisplay = selectedCase || (cases && cases.length > 0 ? cases[0] : null);

  // Main Content Area
  const mainContent = (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-display text-text-primary mb-2">Chargeback Lifecycle Tracker</h1>
        <p className="text-body text-text-secondary">
          Real-time dispute management and analytics for the payments rail
        </p>
      </div>

      {/* Statistics Visualization */}
      <StatsVisualization
        stats={stats}
        outcomes={outcomes}
        isLoading={statsLoading || outcomesLoading}
      />

      {/* Case Timeline & Table */}
      <div className="grid grid-cols-1 gap-6">
        {caseToDisplay && (
          <CaseTimeline case={caseToDisplay} />
        )}
        <CasesTable
          cases={cases || []}
          onCaseSelect={setSelectedCase}
        />
      </div>
    </div>
  );

  // Sidebar Content
  const sidebarContent = (
    <>
      {/* Title & High-level Metric */}
      <div className="glass-card p-4">
        <h2 className="text-headline text-text-primary mb-4">Intelligence Panel</h2>
        <div className="space-y-3">
          <div>
            <p className="text-caption text-text-secondary">Active Cases</p>
            <p className="text-2xl font-bold text-accent-primary">
              {stats?.open_cases || 0}
            </p>
          </div>
          <div>
            <p className="text-caption text-text-secondary">Total Volume</p>
            <p className="text-xl font-semibold text-accent-secondary">
              ${stats?.total_chargeback_volume.toFixed(0) || '0'}
            </p>
          </div>
        </div>
      </div>

      {/* Why This Matters */}
      <SidebarInsight
        title="Why This Matters"
        icon={AlertCircle}
        content="Chargebacks directly impact merchant profitability and payment processing costs. Understanding dispute patterns helps merchants reduce false positives, optimize evidence submission, and improve their relationship with payment networks."
        details={[
          'Merchant operational efficiency',
          'Cost control & profitability',
          'Network standing & compliance',
          'Customer trust & retention',
        ]}
      />

      {/* Who Controls the Rail */}
      <SidebarInsight
        title="Who Controls the Rail"
        icon={Users}
        content="Card networks (Visa, Mastercard, Amex, Discover), issuing banks, acquiring banks, and payment processors collaboratively define dispute rules, timelines, and outcomes while merchants must operate within their frameworks."
        details={[
          'Card Networks: Define rules & timelines',
          'Issuing Banks: Initiate investigations',
          'Acquiring Banks: Support merchants',
          'Processors: Execute transactions',
        ]}
      />

      {/* Filters & Tooltips */}
      <FiltersPanel
        filters={filters}
        onFilterChange={setFilters}
        onDownload={handleDownload}
        isLoading={downloadLoading}
      />
    </>
  );

  return (
    <DashboardLayout mainContent={mainContent} sidebarContent={sidebarContent} />
  );
}
