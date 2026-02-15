import React from 'react';
import Card from './Card';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  action?: React.ReactNode;
}

export default function StatCard({ title, value, subtitle, action }: StatCardProps) {
  return (
    <Card>
      <div className="flex flex-col">
        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
        {subtitle && (
          <p className="text-sm text-gray-500 mb-4">{subtitle}</p>
        )}
        {action && <div className="mt-auto">{action}</div>}
      </div>
    </Card>
  );
}
