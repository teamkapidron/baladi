'use client';

import { format, parseISO } from '@repo/ui/lib/date';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from '@repo/ui/lib/recharts';
import { ChartContainer } from '@repo/ui/components/base/chart-container';

export function RevenueOrdersChart() {
  const revenueData = [
    { date: '2024-01-01', revenue: 100, orders: 10 },
    { date: '2024-01-02', revenue: 200, orders: 20 },
    { date: '2024-01-03', revenue: 300, orders: 30 },
  ];

  const chartConfig = {
    sales: {
      label: 'Sales',
    },
    revenue: {
      label: 'Revenue',
      color: '#007bff',
    },
    orders: {
      label: 'Orders',
      color: '#28a745',
    },
  };

  const totalMetrics = {
    revenue: 1000,
    orders: 100,
  };

  return (
    <ChartContainer title="Daily Revenue & Orders">
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={revenueData}
            margin={{ top: 20, right: 10, left: 10, bottom: 0 }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="var(--color-border)"
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => format(parseISO(value), 'MMM d')}
              tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0]?.payload;
                  return (
                    <div className="border border-slate-100 bg-white p-3 shadow-md">
                      <p className="text-sm font-medium">
                        {format(parseISO(data.date), 'MMM d, yyyy')}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        <span
                          className="mr-1 inline-block h-3 w-3"
                          style={{ backgroundColor: chartConfig.revenue.color }}
                        ></span>
                        Revenue: ${data.revenue}
                      </p>
                      <p className="text-xs text-slate-500">
                        <span
                          className="mr-1 inline-block h-3 w-3"
                          style={{ backgroundColor: chartConfig.orders.color }}
                        ></span>
                        Orders: {data.orders}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              yAxisId="left"
              dataKey="revenue"
              fill={chartConfig.revenue.color}
              radius={[4, 4, 0, 0]}
              animationBegin={0}
              animationDuration={1500}
              animationEasing="ease-out"
            />
            <Bar
              yAxisId="right"
              dataKey="orders"
              fill={chartConfig.orders.color}
              radius={[4, 4, 0, 0]}
              animationBegin={300}
              animationDuration={1500}
              animationEasing="ease-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Chart footer with summary metrics */}
      <div className="mt-2 grid grid-cols-2 gap-4 px-4 pb-4">
        <div className="flex flex-col">
          <p className="text-sm font-medium">Total Revenue</p>
          <p className="text-lg font-semibold">
            ${totalMetrics.revenue.toLocaleString()}
          </p>
          <p className="text-xs text-slate-500">30-day period</p>
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-medium">Total Orders</p>
          <p className="text-lg font-semibold">
            {totalMetrics.orders.toLocaleString()}
          </p>
          <p className="text-xs text-slate-500">30-day period</p>
        </div>
      </div>
    </ChartContainer>
  );
}
