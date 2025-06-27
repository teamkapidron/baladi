'use client';

// Node Modules
import { memo, useMemo } from 'react';

// Components
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from '@repo/ui/lib/recharts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/base/select';

// Hooks
import { useCategory } from '@/hooks/useCategory';
import { useDatePresets } from '@repo/ui/hooks/useDate/useDatePresets';
import { useDateRangeInParams } from '@repo/ui/hooks/useDate/useDateRangeInParams';
import { formatPrice } from '@/utils/price.util';

function CategoryRevenueWastageChart() {
  const { categoryGraphDataQuery } = useCategory();

  // Use the same date range instance as the useCategory hook
  const { dateRange, setDateRange } = useDateRangeInParams();
  const { presetOptions, currentPreset, handlePresetChange, getDisplayText } =
    useDatePresets({ dateRange, setDateRange });

  const graphData = useMemo(() => {
    return categoryGraphDataQuery.data?.categories ?? [];
  }, [categoryGraphDataQuery.data]);

  const categoryData = useMemo(() => {
    const rawData = graphData ?? [];

    return rawData.map((item) => {
      const totalRevenue = item.totalRevenue || 0;
      const totalProfit = item.grossProfit || 0;
      const totalWastageQuantity = item.totalWastageQuantity || 0;
      const totalWastageAmount = item.totalWastageAmount || 0;
      const total = item.totalValue || 0;

      if (total === 0) {
        return {
          category: item.categoryName,
          revenue: 0,
          profit: 0,
          wastage: 0,
          totalRevenue,
          totalProfit,
          totalWastageQuantity,
        };
      }

      const revenue = (totalRevenue / total) * 100;
      const wastage = (totalWastageAmount / total) * 100;
      const profit = (totalProfit / total) * 100;

      return {
        category: item.categoryName,
        revenue,
        profit,
        wastage,
        totalRevenue,
        totalProfit,
        totalWastageAmount,
      };
    });
  }, [graphData]);

  const totals = useMemo(() => {
    if (!categoryData.length) {
      return { totalRevenue: 0, totalProfit: 0, totalWastageAmount: 0 };
    }

    return categoryData.reduce(
      (acc, item) => ({
        totalRevenue: acc.totalRevenue + (item.totalRevenue || 0),
        totalProfit: acc.totalProfit + (item.totalProfit || 0),
        totalWastageAmount:
          acc.totalWastageAmount + (item.totalWastageAmount || 0),
      }),
      { totalRevenue: 0, totalProfit: 0, totalWastageAmount: 0 },
    );
  }, [categoryData]);

  const chartConfig = {
    revenue: {
      label: 'Inntekt',
      color: 'var(--baladi-success)',
    },
    profit: {
      label: 'Fortjeneste',
      color: 'var(--baladi-primary)',
    },
    wastage: {
      label: 'Svinn',
      color: 'var(--baladi-warning)',
    },
  };

  return (
    <div className="h-full rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-200">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-[family-name:var(--font-sora)] text-lg font-bold text-gray-900">
            Kategorivis inntekt, fortjeneste og svinnh
          </h3>
          <p className="font-[family-name:var(--font-dm-sans)] text-sm text-gray-600">
            Sammenligning av inntekt, fortjeneste og svinnh per kategori
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[var(--baladi-primary)]/5 rounded-lg px-3 py-1.5">
            <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-primary)]">
              {getDisplayText()}
            </span>
          </div>

          <Select value={currentPreset} onValueChange={handlePresetChange}>
            <SelectTrigger className="w-[160px] border-[var(--baladi-border)] bg-white font-[family-name:var(--font-dm-sans)] text-sm hover:border-[var(--baladi-primary)]">
              <SelectValue placeholder="Velg periode" />
            </SelectTrigger>
            <SelectContent>
              {presetOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {categoryData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <svg
              className="h-8 w-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
          <h4 className="mb-2 font-[family-name:var(--font-sora)] text-lg font-semibold text-gray-900">
            Ingen kategoridata ennå
          </h4>
          <p className="font-[family-name:var(--font-dm-sans)] text-sm text-gray-600">
            Kategorivis analyse vil vises her når du begynner å motta
            bestillinger og registrere svinnh.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-6 flex flex-wrap justify-center gap-6">
            {Object.entries(chartConfig).map(([key, config]) => (
              <div key={key} className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-sm"
                  style={{ backgroundColor: config.color }}
                />
                <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-gray-700">
                  {config.label}
                </span>
              </div>
            ))}
          </div>

          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categoryData}
                margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                barCategoryGap="20%"
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                  vertical={false}
                />
                <XAxis
                  dataKey="category"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 12,
                    fill: '#6b7280',
                    fontFamily: 'var(--font-dm-sans)',
                  }}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 12,
                    fill: '#6b7280',
                    fontFamily: 'var(--font-dm-sans)',
                  }}
                  tickFormatter={(value) => `${value.toFixed(0)}%`}
                  domain={[0, 100]}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0]?.payload;
                      return (
                        <div className="rounded-lg border border-[var(--baladi-border)] bg-white p-3 shadow-lg">
                          <p className="font-[family-name:var(--font-dm-sans)] text-sm font-semibold text-[var(--baladi-dark)]">
                            {label}
                          </p>
                          <div className="mt-2 space-y-1">
                            <p className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
                              <span
                                className="mr-2 inline-block h-2 w-2 rounded-full"
                                style={{
                                  backgroundColor: chartConfig.revenue.color,
                                }}
                              />
                              Inntekt: {formatPrice(data.totalRevenue || 0)} kr
                            </p>
                            <p className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
                              <span
                                className="mr-2 inline-block h-2 w-2 rounded-full"
                                style={{
                                  backgroundColor: chartConfig.profit.color,
                                }}
                              />
                              Fortjeneste: {formatPrice(data.totalProfit || 0)}{' '}
                              kr
                            </p>
                            <p className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
                              <span
                                className="mr-2 inline-block h-2 w-2 rounded-full"
                                style={{
                                  backgroundColor: chartConfig.wastage.color,
                                }}
                              />
                              Svinn: {formatPrice(data.totalWastageAmount || 0)}{' '}
                              kr
                            </p>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar
                  dataKey="revenue"
                  stackId="stack"
                  fill={chartConfig.revenue.color}
                  radius={[0, 0, 0, 0]}
                />
                <Bar
                  dataKey="profit"
                  stackId="stack"
                  fill={chartConfig.profit.color}
                  radius={[0, 0, 0, 0]}
                />
                <Bar
                  dataKey="wastage"
                  stackId="stack"
                  fill={chartConfig.wastage.color}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="bg-[var(--baladi-success)]/5 rounded-lg p-3">
              <p className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-success)]">
                Total inntekt
              </p>
              <p className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-dark)]">
                {formatPrice(totals.totalRevenue || 0)} kr
              </p>
            </div>

            <div className="bg-[var(--baladi-info)]/5 rounded-lg p-3">
              <p className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-info)]">
                Total fortjeneste
              </p>
              <p className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-dark)]">
                {formatPrice(totals.totalProfit || 0)} kr
              </p>
            </div>

            <div className="bg-[var(--baladi-warning)]/5 rounded-lg p-3">
              <p className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-warning)]">
                Total svinn
              </p>
              <p className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-dark)]">
                {formatPrice(totals.totalWastageAmount || 0)} kr
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default memo(CategoryRevenueWastageChart);
