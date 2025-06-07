'use client';

// Node Modules
import { memo } from 'react';

// Components
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from '@repo/ui/lib/recharts';
import { ChartContainer } from '@repo/ui/components/base/chart-container';

// Hooks
import { useOrder } from '@/hooks/useOrder';

function RevenueOrdersChart() {
  const { orderRevenueGraphDataQuery } = useOrder();

  const revenueData = orderRevenueGraphDataQuery.data?.data ?? [];

  const chartConfig = {
    orderCount: {
      label: 'Order Count',
      color: '#007bff',
    },
    totalRevenue: {
      label: 'Revenue',
      color: '#28a745',
    },
    totalCost: {
      label: 'Cost',
      color: '#ffc107',
    },
    totalProfit: {
      label: 'Profit',
      color: '#dc3545',
    },
  };

  const totalMetrics = {
    orderCount: 0,
    totalRevenue: 0,
    totalCost: 0,
    totalProfit: 0,
  };

  return (
    <ChartContainer title="Daily Revenue & Orders">
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
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
              tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              dataKey="totalRevenue"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              dataKey="orderCount"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              dataKey="totalCost"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              dataKey="totalProfit"
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
                      <p className="text-sm font-medium">{data.date}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        <span
                          className="mr-1 inline-block h-3 w-3"
                          style={{
                            backgroundColor: chartConfig.totalRevenue.color,
                          }}
                        ></span>
                        Revenue: ${data.totalRevenue}
                      </p>
                      <p className="text-xs text-slate-500">
                        <span
                          className="mr-1 inline-block h-3 w-3"
                          style={{
                            backgroundColor: chartConfig.orderCount.color,
                          }}
                        ></span>
                        Orders: {data.orderCount}
                      </p>
                      <p className="text-xs text-slate-500">
                        <span
                          className="mr-1 inline-block h-3 w-3"
                          style={{
                            backgroundColor: chartConfig.totalCost.color,
                          }}
                        ></span>
                        Cost: ${data.totalCost}
                      </p>
                      <p className="text-xs text-slate-500">
                        <span
                          className="mr-1 inline-block h-3 w-3"
                          style={{
                            backgroundColor: chartConfig.totalProfit.color,
                          }}
                        ></span>
                        Profit: ${data.totalProfit}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="totalRevenue"
              stroke={chartConfig.totalRevenue.color}
              fill={chartConfig.totalRevenue.color}
              fillOpacity={0.6}
              activeDot={{ r: 6 }}
              animationBegin={0}
              animationDuration={1500}
              animationEasing="ease-out"
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="orderCount"
              stroke={chartConfig.orderCount.color}
              fill={chartConfig.orderCount.color}
              fillOpacity={0.6}
              activeDot={{ r: 6 }}
              animationBegin={300}
              animationDuration={1500}
              animationEasing="ease-out"
            />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="totalCost"
              stroke={chartConfig.totalCost.color}
              fill={chartConfig.totalCost.color}
              fillOpacity={0.6}
              activeDot={{ r: 6 }}
              animationBegin={600}
              animationDuration={1500}
              animationEasing="ease-out"
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="totalProfit"
              stroke={chartConfig.totalProfit.color}
              fill={chartConfig.totalProfit.color}
              fillOpacity={0.6}
              activeDot={{ r: 6 }}
              animationBegin={900}
              animationDuration={1500}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Chart footer with summary metrics */}
      <div className="mt-2 grid grid-cols-2 gap-4 px-4 pb-4">
        <div className="flex flex-col">
          <p className="text-sm font-medium">Total Revenue</p>
          <p className="text-lg font-semibold">
            ${totalMetrics.totalRevenue.toLocaleString()}
          </p>
          <p className="text-xs text-slate-500">30-day period</p>
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-medium">Total Orders</p>
          <p className="text-lg font-semibold">
            {totalMetrics.orderCount.toLocaleString()}
          </p>
          <p className="text-xs text-slate-500">30-day period</p>
        </div>
      </div>
    </ChartContainer>
  );
}

export default memo(RevenueOrdersChart);
