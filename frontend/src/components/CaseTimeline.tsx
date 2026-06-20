'use client';

import React, { FC } from 'react';
import { Clock, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import type { ChargebackCase } from '@/types/index';

interface CaseTimelineProps {
  case: ChargebackCase;
}

const CaseTimeline: FC<CaseTimelineProps> = ({ case: chargebackCase }) => {
  const timelineEvents = [
    {
      date: chargebackCase.dispute_date,
      title: 'Dispute Opened',
      description: `Customer initiated dispute for $${chargebackCase.amount}`,
      icon: AlertCircle,
    },
    {
      date: chargebackCase.dispute_date,
      title: 'Bank Review Started',
      description: 'Issuing bank began investigating the claim',
      icon: FileText,
    },
    {
      date: chargebackCase.expected_resolution_date || 'Pending',
      title: 'Merchant Response',
      description: `${chargebackCase.merchant_response_evidence.length} evidence items submitted`,
      icon: CheckCircle,
    },
    {
      date: chargebackCase.expected_resolution_date || 'Pending',
      title: 'Resolution',
      description: `Case status: ${chargebackCase.case_status}`,
      icon: Clock,
    },
  ];

  return (
    <div className="glass-card p-6">
      <h3 className="text-title text-text-primary mb-6">Case Timeline</h3>

      <div className="space-y-4">
        {timelineEvents.map((event, index) => {
          const Icon = event.icon;
          return (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-accent-primary/20 border border-accent-primary flex items-center justify-center">
                  <Icon className="w-4 h-4 text-accent-primary" />
                </div>
                {index < timelineEvents.length - 1 && (
                  <div className="w-0.5 h-12 bg-gradient-to-b from-accent-primary to-transparent mt-2" />
                )}
              </div>
              <div className="pb-4 flex-1">
                <p className="text-caption text-text-secondary">{event.date}</p>
                <h4 className="text-body font-semibold text-text-primary mt-1">{event.title}</h4>
                <p className="text-caption text-text-secondary mt-1">{event.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Evidence Checklist */}
      {chargebackCase.merchant_response_evidence.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="text-body font-semibold text-text-primary mb-3">Merchant Evidence</h4>
          <ul className="space-y-2">
            {chargebackCase.merchant_response_evidence.map((evidence, idx) => (
              <li key={idx} className="flex items-center gap-2 text-caption text-text-secondary">
                <CheckCircle className="w-4 h-4 text-accent-primary flex-shrink-0" />
                {evidence}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Root Cause Tags */}
      {chargebackCase.root_cause_tags.length > 0 && (
        <div className="mt-6">
          <h4 className="text-body font-semibold text-text-primary mb-3">Root Cause Analysis</h4>
          <div className="flex flex-wrap gap-2">
            {chargebackCase.root_cause_tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-accent-secondary/10 border border-accent-secondary text-caption text-accent-secondary rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseTimeline;
