import { useMemo, memo, useState } from 'react';
import { ArrowDownAZ, ArrowUpAZ, Star, Clock, Menu } from '@repo/ui/lib/icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/ui/components/base/dropdown-menu';
import { Button } from '@repo/ui/components/base/button';

const sortOptions = [
  { id: 'popularity', label: 'Popularitet', icon: <Star size={16} /> },
  {
    id: 'price-asc',
    label: 'Pris: Lav til Høy',
    icon: <ArrowUpAZ size={16} />,
  },
  {
    id: 'price-desc',
    label: 'Pris: Høy til Lav',
    icon: <ArrowDownAZ size={16} />,
  },
  { id: 'newest', label: 'Nyeste', icon: <Clock size={16} /> },
];

function ProductsSortBar() {
  const [currentPage] = useState(1);
  const [itemsPerPage] = useState(24);
  const [isLoading] = useState(false);
  const [totalProducts] = useState(0);

  // Memoize the status text
  const statusText = useMemo(() => {
    if (isLoading) return 'Laster...';

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalProducts);

    return `Viser ${startItem}-${endItem} av ${totalProducts} produkter`;
  }, [isLoading, totalProducts, currentPage, itemsPerPage]);

  return (
    <div className="mb-6 flex items-center justify-between rounded-lg border border-[var(--baladi-border)] bg-white p-3 shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-md">
      <div className="text-sm font-medium text-[var(--baladi-dark)]">
        {statusText}
      </div>

      <div className="flex items-center gap-3">
        <button
          className="flex items-center gap-2 rounded-md bg-[var(--color-primary)] px-3 py-2 text-sm font-medium text-white transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 md:hidden"
          onClick={() => {}}
          aria-label="Vis filtre"
        >
          <Menu size={18} />
          <span>Filter</span>
        </button>

        <div className="hidden md:block">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Sorter Etter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {sortOptions.map((option) => (
                <DropdownMenuItem key={option.id}>
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductsSortBar);
