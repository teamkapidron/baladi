import { format } from '@repo/ui/lib/date';
import { Clock } from '@repo/ui/lib/icons';

export function DashboardHeader() {
  return (
    <div className="flex flex-col gap-4 bg-gradient-to-r from-slate-800 to-slate-900 p-6 text-white shadow-md md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Business Dashboard
        </h1>
        <div className="mt-2 flex items-center">
          <div className="flex items-center text-sm text-slate-300">
            <Clock className="mr-1 h-3.5 w-3.5 text-slate-400" />
            <span>
              Last updated:{' '}
              {format(new Date('2025-06-30'), 'MMM d, yyyy h:mm a')}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <div className="text-right">
          <p className="text-lg font-medium">Welcome Back!</p>
          <p className="text-sm text-slate-300">Admin Dashboard</p>
        </div>
      </div>
    </div>
  );
}
