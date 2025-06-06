import { ShoppingBag } from '@repo/ui/lib/icons';

export function OrderAlert() {
  const pendingOrders: number = 1;

  if (pendingOrders === 0) {
    return null;
  }

  return (
    <div className="flex items-start bg-amber-500/5 p-4 shadow-sm">
      <ShoppingBag className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500" />
      <div>
        <h3 className="text-foreground mb-1 font-medium">Attention needed</h3>
        <p className="text-muted-foreground text-sm">
          <span className="font-medium text-amber-600">
            You have {pendingOrders} {pendingOrders === 1 ? 'order' : 'orders'}{' '}
            pending{' '}
          </span>
          <span>
            that {pendingOrders === 1 ? 'requires' : 'require'} your attention.
          </span>
        </p>
      </div>
    </div>
  );
}
