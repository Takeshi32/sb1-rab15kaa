import React from 'react';
import { format } from 'date-fns';
import { Tag } from 'lucide-react';
import type { RFIDScan } from '../types';

interface ScanListProps {
  scans: RFIDScan[];
}

export function ScanList({ scans }: ScanListProps) {
  return (
    <div className="divide-y divide-gray-200">
      {scans.map((scan) => (
        <div key={scan.id} className="py-4 flex items-center space-x-4">
          <div className="flex-shrink-0">
            <Tag className="h-6 w-6 text-blue-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              Tag ID: {scan.tagId}
            </p>
            <p className="text-sm text-gray-500">
              User: {scan.userName}
            </p>
          </div>
          <div className="flex-shrink-0 text-sm text-gray-500">
            {format(scan.timestamp, 'PPpp')}
          </div>
        </div>
      ))}
    </div>
  );
}