'use client';

import { FC } from 'react';
import { AlertCircle, Shield, Zap } from 'lucide-react';

interface SidebarInsightProps {
  title: string;
  icon: FC<{ className?: string }>;
  content: string;
  details?: string[];
}

const SidebarInsight: React.FC<SidebarInsightProps> = ({
  title,
  icon: Icon,
  content,
  details,
}) => {
  return (
    <div className="glass-card p-4 border-l-2 border-accent-primary">
      <div className="flex items-start gap-3 mb-3">
        <Icon className="w-5 h-5 text-accent-primary flex-shrink-0 mt-0.5" />
        <h3 className="text-title text-text-primary">{title}</h3>
      </div>
      <p className="text-caption text-text-secondary mb-3">{content}</p>
      {details && details.length > 0 && (
        <ul className="space-y-1">
          {details.map((detail, idx) => (
            <li key={idx} className="text-caption text-text-secondary flex items-start gap-2">
              <span className="text-accent-primary mt-1">→</span>
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SidebarInsight;
