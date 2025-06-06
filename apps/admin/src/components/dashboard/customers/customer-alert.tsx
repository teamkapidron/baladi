import { AlertCircle } from '@repo/ui/lib/icons';

export function CustomerAlert() {
  const pendingUsersCount: number = 1;

  if (pendingUsersCount === 0) return null;

  return (
    <div className="flex items-start bg-amber-500/5 p-4">
      <AlertCircle className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500" />
      <div>
        <h3 className="text-foreground mb-1 font-medium">Customer Alert</h3>
        <p className="text-muted-foreground text-sm">
          <span className="font-medium text-amber-600">
            {pendingUsersCount} customer{pendingUsersCount !== 1 ? 's' : ''}{' '}
            pending approval.{' '}
          </span>
          <span>Please review and approve as needed.</span>
        </p>
      </div>
    </div>
  );
}
