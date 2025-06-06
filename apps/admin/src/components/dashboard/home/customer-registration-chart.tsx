'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Dot,
} from '@repo/ui/lib/recharts';
import { format, parseISO } from '@repo/ui/lib/date';
import { ChartContainer } from '@repo/ui/components/base/chart-container';
import { ArrowUpRight } from '@repo/ui/lib/icons';

interface CustomerData {
  date: string;
  newRegistrations: number;
  totalUsers: number;
}

interface ChartConfig {
  newRegistrations: {
    label: string;
    color: string;
  };
  totalUsers: {
    label: string;
    color: string;
  };
}

interface CustomerRegistrationChartProps {
  customerData: CustomerData[];
  chartConfig: ChartConfig;
}

// Custom dot component with animation
interface CustomDotProps {
  cx: number;
  cy: number;
  stroke: string;
}

const CustomDot = ({ cx, cy, stroke }: CustomDotProps) => {
  return (
    <Dot
      cx={cx}
      cy={cy}
      r={4}
      fill="var(--color-background)"
      stroke={stroke}
      strokeWidth={2}
    />
  );
};

export function CustomerRegistrationChart() {
  const customerData = [
    { date: '2024-01-01', newRegistrations: 100, totalUsers: 100 },
    { date: '2024-01-02', newRegistrations: 200, totalUsers: 300 },
    { date: '2024-01-03', newRegistrations: 300, totalUsers: 600 },
  ];
  const chartConfig: ChartConfig = {
    newRegistrations: {
      label: 'New Registrations',
      color: '#007bff',
    },
    totalUsers: {
      label: 'Total Users',
      color: '#28a745',
    },
  };

  const growthPercent = 10;

  return (
    <ChartContainer title="Customer Registration">
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={customerData}
            margin={{ top: 20, right: 10, left: 10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorNewReg" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={chartConfig.newRegistrations.color}
                  stopOpacity={0.4}
                />
                <stop
                  offset="95%"
                  stopColor={chartConfig.newRegistrations.color}
                  stopOpacity={0.05}
                />
              </linearGradient>
              <linearGradient id="colorTotalUsers" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={chartConfig.totalUsers.color}
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor={chartConfig.totalUsers.color}
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>
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
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0]?.payload as CustomerData;
                  return (
                    <div className="border border-slate-100 bg-white p-3 shadow-md">
                      <p className="text-sm font-medium">
                        {format(parseISO(data.date), 'MMM d, yyyy')}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        <span
                          className="mr-1 inline-block h-3 w-3 rounded-full"
                          style={{
                            backgroundColor: chartConfig.newRegistrations.color,
                          }}
                        ></span>
                        New Users: {data.newRegistrations}
                      </p>
                      <p className="text-xs text-slate-500">
                        <span
                          className="mr-1 inline-block h-3 w-3 rounded-full"
                          style={{
                            backgroundColor: chartConfig.totalUsers.color,
                          }}
                        ></span>
                        Total Users: {data.totalUsers}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="natural"
              dataKey="newRegistrations"
              stroke={chartConfig.newRegistrations.color}
              strokeWidth={2}
              fill="url(#colorNewReg)"
              dot={false}
              activeDot={(props) => (
                <CustomDot
                  {...props}
                  stroke={chartConfig.newRegistrations.color}
                />
              )}
              animationBegin={0}
              animationDuration={1500}
              animationEasing="ease-out"
            />
            <Area
              type="natural"
              dataKey="totalUsers"
              stroke={chartConfig.totalUsers.color}
              strokeWidth={2}
              fill="url(#colorTotalUsers)"
              dot={false}
              activeDot={(props) => (
                <CustomDot {...props} stroke={chartConfig.totalUsers.color} />
              )}
              animationBegin={300}
              animationDuration={1500}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Chart footer with trend information */}
      <div className="mt-2 flex items-center justify-between px-4 pb-4">
        <div>
          <p className="text-sm font-medium">User Growth</p>
          <p className="text-xs text-slate-500">30-day trend analysis</p>
        </div>
        <div className="flex items-center">
          <span
            className={`inline-flex items-center px-1.5 py-0.5 text-xs font-medium ${growthPercent >= 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}
          >
            {growthPercent >= 0 ? (
              <ArrowUpRight className="mr-1 h-3 w-3" />
            ) : (
              <ArrowUpRight className="mr-1 h-3 w-3 rotate-90 transform" />
            )}
            {Math.abs(growthPercent)}%
          </span>
        </div>
      </div>
    </ChartContainer>
  );
}
