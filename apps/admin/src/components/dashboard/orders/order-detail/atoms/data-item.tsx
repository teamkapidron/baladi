import React from 'react';

interface DataItemProps {
  icon?: React.ReactNode;
  label: string;
  value: React.ReactNode;
  valueClassName?: string;
}

function DataItem(props: DataItemProps) {
  const { icon, label, value, valueClassName } = props;

  return (
    <div className="flex items-start gap-3">
      {icon && <div className="mt-0.5 text-gray-400">{icon}</div>}
      <div>
        <p className="mb-1 text-sm text-gray-500">{label}</p>
        <div className={`font-medium ${valueClassName}`}>{value}</div>
      </div>
    </div>
  );
}

export default DataItem;
