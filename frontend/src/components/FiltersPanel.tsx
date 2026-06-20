'use client';

import React, { FC } from 'react';
import { ChevronDown, Download, Filter } from 'lucide-react';
import type { FilterState } from '@/types/index';

interface FiltersPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onDownload: () => void;
  isLoading?: boolean;
}

const statuses = ['opened', 'under_review', 'merchant_response', 'resolved'];
const reasons = ['fraud', 'item_not_received', 'quality_issue', 'not_as_described'];
const networks = ['visa', 'mastercard', 'amex', 'discover'];

const FiltersPanel: FC<FiltersPanelProps> = ({
  filters,
  onFilterChange,
  onDownload,
  isLoading = false,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-title text-text-primary flex items-center gap-2">
          <Filter className="w-4 h-4 text-accent-primary" />
          Filters
        </h4>
      </div>

      <div className="space-y-3">
        {/* Status Filter */}
        <div>
          <label className="text-caption text-text-secondary block mb-2 font-semibold">
            Case Status
          </label>
          <select
            value={filters.status || ''}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                status: e.target.value || undefined,
              })
            }
            className="w-full bg-surface border border-border rounded px-3 py-2 text-text-primary text-sm focus:outline-none focus:border-accent-primary"
          >
            <option value="">All Statuses</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status.replace(/_/g, ' ')}
              </option>
            ))}
          </select>
        </div>

        {/* Dispute Reason Filter */}
        <div>
          <label className="text-caption text-text-secondary block mb-2 font-semibold">
            Dispute Reason
          </label>
          <select
            value={filters.reason || ''}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                reason: e.target.value || undefined,
              })
            }
            className="w-full bg-surface border border-border rounded px-3 py-2 text-text-primary text-sm focus:outline-none focus:border-accent-primary"
          >
            <option value="">All Reasons</option>
            {reasons.map((reason) => (
              <option key={reason} value={reason}>
                {reason.replace(/_/g, ' ')}
              </option>
            ))}
          </select>
        </div>

        {/* Card Network Filter */}
        <div>
          <label className="text-caption text-text-secondary block mb-2 font-semibold">
            Card Network
          </label>
          <select
            value={filters.network || ''}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                network: e.target.value || undefined,
              })
            }
            className="w-full bg-surface border border-border rounded px-3 py-2 text-text-primary text-sm focus:outline-none focus:border-accent-primary"
          >
            <option value="">All Networks</option>
            {networks.map((network) => (
              <option key={network} value={network}>
                {network.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={onDownload}
        disabled={isLoading}
        className="w-full mt-6 flex items-center justify-center gap-2 bg-accent-primary text-background px-4 py-2 rounded font-semibold text-sm hover:bg-[#2dd4e8] disabled:opacity-50 transition-colors"
      >
        <Download className="w-4 h-4" />
        Download Sample Data
      </button>
    </div>
  );
};

export default FiltersPanel;
