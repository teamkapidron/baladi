'use client';

import { Clock, CheckCircle } from '@repo/ui/lib/icons';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@repo/ui/components/base/chart';
import {
  Label,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from '@repo/ui/lib/recharts';

interface OrderStatusData {
  name: string;
  confirmed: number;
  pending: number;
  shipped: number;
}

interface OrderStatusChartProps {
  orderStatusData: OrderStatusData[];
  chartColors: {
    green: string;
    amber: string;
    blue: string;
    purple: string;
    red: string;
    slate: string;
  };
  pendingOrders: number;
  totalRevenue: number;
  totalOrders: number;
}

export function OrderStatusChart() {
  const orderStatusData = [
    { name: 'Confirmed', value: 100 },
    { name: 'Pending', value: 50 },
    { name: 'Shipped', value: 25 },
  ];

  const chartColors = {
    green: '#28a745',
    amber: '#ffc107',
    blue: '#007bff',
  };

  const totalOrders = 150;
  const pendingOrders = 25;
  const totalRevenue = 1000;

  return (
    <div className="overflow-hidden bg-white shadow-sm">
      <div className="border-b border-slate-100 px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-slate-900">Order Status</h2>
            <p className="mt-1 text-sm text-slate-500">
              Current order distribution
            </p>
          </div>
        </div>
      </div>

      <div className="flex h-[300px] items-center justify-center p-6">
        <ChartContainer
          config={{
            confirmed: { label: 'Confirmed', color: chartColors.green },
            pending: { label: 'Pending', color: chartColors.amber },
            shipped: { label: 'Shipped', color: chartColors.blue },
          }}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={orderStatusData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
            startAngle={0}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-slate-900 text-2xl font-bold"
                        >
                          {totalOrders.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-slate-500"
                        >
                          Total Orders
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="confirmed"
              stackId="a"
              cornerRadius={5}
              fill={chartColors.green}
              className="stroke-transparent stroke-2"
              animationBegin={0}
              animationDuration={1500}
              animationEasing="ease-out"
            />
            <RadialBar
              dataKey="pending"
              stackId="a"
              cornerRadius={5}
              fill={chartColors.amber}
              className="stroke-transparent stroke-2"
              animationBegin={300}
              animationDuration={1500}
              animationEasing="ease-out"
            />
            <RadialBar
              dataKey="shipped"
              stackId="a"
              cornerRadius={5}
              fill={chartColors.blue}
              className="stroke-transparent stroke-2"
              animationBegin={600}
              animationDuration={1500}
              animationEasing="ease-out"
            />
          </RadialBarChart>
        </ChartContainer>
      </div>
      <div className="flex-col items-start gap-2 border-t border-slate-100 px-6 py-4 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {pendingOrders > 0 ? (
            <>
              Pending approval: {pendingOrders} orders{' '}
              <Clock className="ml-1 h-4 w-4 text-amber-500" />
            </>
          ) : (
            <>
              All orders processed{' '}
              <CheckCircle className="ml-1 h-4 w-4 text-green-500" />
            </>
          )}
        </div>
        <div className="mt-2 leading-none text-slate-500">
          Total revenue: ${totalRevenue.toFixed(2)}
        </div>
      </div>
    </div>
  );
}
