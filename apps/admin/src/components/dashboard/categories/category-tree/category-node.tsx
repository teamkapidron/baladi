'use client';

// Node Modules
import { memo, useCallback, useMemo } from 'react';
import {
  ChevronDown,
  ChevronRight,
  FolderIcon,
  FolderOpenIcon,
} from '@repo/ui/lib/icons';

// Components
import { Switch } from '@repo/ui/components/base/switch';

// Hooks
import { usePagination } from '@repo/ui/hooks/usePagination';
import { useProductFilters } from '@/hooks/useProduct/useProductFilters';

// Types
import type { HierarchicalCategory } from '@repo/types/category';

interface CategoryNodeProps {
  category: HierarchicalCategory;
  level: number;
  onToggle: (categoryId: string) => void;
  onToggleActive?: (categoryId: string, isActive: boolean) => void;
  expandedNodes: Set<string>;
}

function CategoryNode(props: CategoryNodeProps) {
  const { category, level, onToggle, onToggleActive, expandedNodes } = props;

  const { handlePageChange } = usePagination();
  const { category: selectedCategory, changeCategory } = useProductFilters();

  const isSelected = useMemo(() => {
    return selectedCategory === category._id;
  }, [selectedCategory, category._id]);

  const paddingLeft = level * 16 + 12;
  const isExpanded = expandedNodes.has(category._id);
  const hasChildren = category.children && category.children.length > 0;

  const handleChangeCategory = useCallback(() => {
    changeCategory(category._id);
    handlePageChange(1);
  }, [category._id, changeCategory, handlePageChange]);

  const handleToggleActive = useCallback(
    (checked: boolean) => {
      onToggleActive?.(category._id, checked);
    },
    [onToggleActive, category._id],
  );

  return (
    <div className="space-y-1">
      <div
        className={`hover:bg-[var(--baladi-primary)]/5 group flex items-center gap-2 rounded-lg px-3 py-2 transition-all ${
          isSelected
            ? 'bg-[var(--baladi-primary)]/10 border-l-4 border-[var(--baladi-primary)]'
            : ''
        } ${category.isActive === false ? 'bg-gray-100/80 opacity-60' : ''}`}
        style={{ paddingLeft }}
      >
        {hasChildren ? (
          <button
            onClick={() => onToggle(category._id)}
            className="hover:bg-[var(--baladi-primary)]/10 flex h-4 w-4 items-center justify-center rounded"
          >
            {isExpanded ? (
              <ChevronDown className="h-3 w-3 text-[var(--baladi-gray)]" />
            ) : (
              <ChevronRight className="h-3 w-3 text-[var(--baladi-gray)]" />
            )}
          </button>
        ) : (
          <div className="h-4 w-4" />
        )}

        <div className="bg-[var(--baladi-primary)]/10 flex h-6 w-6 items-center justify-center rounded">
          {isExpanded && hasChildren ? (
            <FolderOpenIcon className="h-4 w-4 text-[var(--baladi-primary)]" />
          ) : (
            <FolderIcon className="h-4 w-4 text-[var(--baladi-primary)]" />
          )}
        </div>

        <div
          onClick={handleChangeCategory}
          className="flex flex-1 cursor-pointer items-center justify-between"
        >
          <span
            className={`font-[family-name:var(--font-dm-sans)] text-sm font-medium ${
              category.isActive === false
                ? 'text-[var(--baladi-gray)]'
                : 'text-[var(--baladi-dark)]'
            }`}
          >
            {category.name}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Switch
              checked={category.isActive ?? true}
              onCheckedChange={handleToggleActive}
              className="scale-75 opacity-0 transition-opacity group-hover:opacity-100"
              title={
                category.isActive ? 'Deaktiver kategori' : 'Aktiver kategori'
              }
              onClick={(e) => e.stopPropagation()}
            />
            <span className="text-xs text-[var(--baladi-gray)] opacity-0 transition-opacity group-hover:opacity-100">
              {category.isActive ? 'Aktiv' : 'Inaktiv'}
            </span>
          </div>
        </div>
      </div>

      {isExpanded && hasChildren && (
        <div className="space-y-1">
          {category.children!.map((child) => (
            <CategoryNode
              key={child._id}
              category={child}
              level={level + 1}
              onToggle={onToggle}
              onToggleActive={onToggleActive}
              expandedNodes={expandedNodes}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default memo(CategoryNode);
