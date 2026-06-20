'use client';

import React, { FC, useState } from 'react';
import { useReactTable, getCoreRowModel, ColumnDef } from '@tanstack/react-table';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { ChargebackCase } from '@/types/index';

interface CasesTableProps {
  cases: ChargebackCase[];
  onCaseSelect?: (chargebackCase: ChargebackCase) => void;
}

const CasesTable: FC<CasesTableProps> = ({ cases, onCaseSelect }) => {
  const [sorting, setSorting] = useState<any[]>([]);

  const columns: ColumnDef<ChargebackCase>[] = [
    {
      accessorKey: 'id',
      header: 'Case ID',
      cell: (info) => (
        <span className="text-caption text-accent-primary font-mono">{info.getValue()}</span>
      ),
    },
    {
      accessorKey: 'merchant_name',
      header: 'Merchant',
      cell: (info) => <span className="text-caption text-text-primary">{info.getValue()}</span>,
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: (info) => (
        <span className="text-caption text-text-primary">
          ${(info.getValue() as number).toFixed(2)}
        </span>
      ),
    },
    {
      accessorKey: 'case_status',
      header: 'Status',
      cell: (info) => {
        const status = info.getValue() as string;
        const statusColors: Record<string, string> = {
          opened: 'bg-red-500/20 text-red-400',
          under_review: 'bg-yellow-500/20 text-yellow-400',
          merchant_response: 'bg-blue-500/20 text-blue-400',
          resolved: 'bg-green-500/20 text-green-400',
        };
        return (
          <span className={`px-2 py-1 rounded text-caption font-semibold ${statusColors[status]}`}>
            {status.replace(/_/g, ' ')}
          </span>
        );
      },
    },
    {
      accessorKey: 'card_network',
      header: 'Network',
      cell: (info) => (
        <span className="text-caption text-text-secondary uppercase">{info.getValue()}</span>
      ),
    },
  ];

  const table = useReactTable({
    data: cases,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="glass-card p-4 overflow-x-auto">
      <h3 className="text-title text-text-primary mb-4">Recent Cases</h3>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-border">
            {table.getHeaderGroups().map((headerGroup) =>
              headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-2 text-caption font-semibold text-text-secondary"
                >
                  {header.isPlaceholder
                    ? null
                    : React.isValidElement(header.column.columnDef.header)
                    ? header.column.columnDef.header
                    : String(header.column.columnDef.header)}
                </th>
              ))
            )}
          </tr>
        </thead>
        <tbody>
          {table.getRowModel().rows.slice(0, 8).map((row) => (
            <tr
              key={row.id}
              onClick={() => onCaseSelect?.(row.original)}
              className="border-b border-border hover:bg-surface/50 cursor-pointer transition-colors"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-3">
                  {React.isValidElement(cell.column.columnDef.cell)
                    ? cell.column.columnDef.cell
                    : (cell.column.columnDef.cell as any)(cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CasesTable;
