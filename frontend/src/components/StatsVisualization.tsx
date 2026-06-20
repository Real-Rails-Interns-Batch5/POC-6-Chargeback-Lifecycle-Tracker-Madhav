'use client';

import React, { FC } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import type { ChargebackStats, DisputeOutcomeStats } from '@/types/index';

interface StatsVisualizationProps {
  stats: ChargebackStats | null;
  outcomes: DisputeOutcomeStats | null;
  isLoading?: boolean;
}

const COLORS = ['#38BDF8', '#818CF8', '#F97316', '#EC4899'];

const StatsVisualization: FC<StatsVisualizationProps> = ({ stats, outcomes, isLoading = false }) => {
  if (isLoading || !stats || !outcomes) {
    return (
      <div className="glass-card p-6 h-full flex items-center justify-center">
        <div className="text-text-secondary text-sm">Loading statistics...</div>
      </div>
    );
  }

  const caseStatusData = [
    { name: 'Open', value: stats.open_cases },
    { name: 'Resolved', value: stats.resolved_cases },
  ];

  const outcomesData = [
    { name: 'Favorable to Merchant', value: outcomes.favorable_to_merchant },
    { name: 'Favorable to Customer', value: outcomes.favorable_to_customer },
    { name: 'Pending', value: outcomes.pending },
    { name: 'Settlement', value: outcomes.settlement },
  ];

  const merchantPerformanceData = [
    { name: 'Won', value: stats.merchant_win_count },
    { name: 'Lost', value: stats.merchant_loss_count },
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card p-4">
          <p className="text-caption text-text-secondary mb-1">Total Cases</p>
          <p className="text-3xl font-bold text-accent-primary">{stats.total_cases}</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-caption text-text-secondary mb-1">Avg Dispute Amount</p>
          <p className="text-2xl font-bold text-accent-secondary">${stats.avg_dispute_amount.toFixed(2)}</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-caption text-text-secondary mb-1">Total Volume</p>
          <p className="text-2xl font-bold text-accent-primary">${stats.total_chargeback_volume.toFixed(0)}</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-caption text-text-secondary mb-1">Merchant Win Rate</p>
          <p className="text-2xl font-bold text-accent-secondary">
            {((stats.merchant_win_count / (stats.merchant_win_count + stats.merchant_loss_count)) * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-4">
        {/* Case Status Pie */}
        <div className="glass-card p-4">
          <h4 className="text-caption text-text-secondary mb-4 font-semibold">Case Status Distribution</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={caseStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#38BDF8"
                dataKey="value"
              >
                {caseStatusData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#0B1117', border: '1px solid #1F2937' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Merchant Performance Bar */}
        <div className="glass-card p-4">
          <h4 className="text-caption text-text-secondary mb-4 font-semibold">Merchant Performance</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={merchantPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
              <XAxis dataKey="name" stroke="#D1D5DB" />
              <YAxis stroke="#D1D5DB" />
              <Tooltip contentStyle={{ backgroundColor: '#0B1117', border: '1px solid #1F2937' }} />
              <Bar dataKey="value" fill="#38BDF8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Outcomes Bar */}
      <div className="glass-card p-4">
        <h4 className="text-caption text-text-secondary mb-4 font-semibold">Dispute Outcomes</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={outcomesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
            <XAxis dataKey="name" stroke="#D1D5DB" angle={-45} textAnchor="end" height={130} />
            <YAxis stroke="#D1D5DB" />
            <Tooltip contentStyle={{ backgroundColor: '#0B1117', border: '1px solid #1F2937' }} />
            <Bar dataKey="value" fill="#818CF8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatsVisualization;
