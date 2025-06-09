'use client';

// Node Modules
import { memo, useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  FolderIcon,
  FolderOpenIcon,
  MoreHorizontal,
  Edit,
  Trash2,
  Plus,
  Search,
  Move,
  Copy,
  Info,
} from '@repo/ui/lib/icons';
import { Button } from '@repo/ui/components/base/button';
import { Input } from '@repo/ui/components/base/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/ui/components/base/dropdown-menu';
import { Badge } from '@repo/ui/components/base/badge';
import { Switch } from '@repo/ui/components/base/switch';

// Types
import type { HierarchicalCategory } from '@repo/types/category';

interface CategoryNodeProps {
  category: HierarchicalCategory;
  level: number;
  isSelected: boolean;
  onSelect: (category: HierarchicalCategory) => void;
  onToggle: (categoryId: string) => void;
  expandedNodes: Set<string>;
}

function CategoryNode({
  category,
  level,
  isSelected,
  onSelect,
  onToggle,
  expandedNodes,
}: CategoryNodeProps) {
  const hasChildren = category.children && category.children.length > 0;
  const isExpanded = expandedNodes.has(category._id);
  const paddingLeft = level * 16 + 12;

  return (
    <div className="space-y-1">
      <div
        className={`hover:bg-[var(--baladi-primary)]/5 group flex items-center gap-2 rounded-lg px-3 py-2 transition-all ${
          isSelected
            ? 'bg-[var(--baladi-primary)]/10 border-l-4 border-[var(--baladi-primary)]'
            : ''
        }`}
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

        <button
          onClick={() => onSelect(category)}
          className="flex flex-1 items-center justify-between text-left"
        >
          <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
            {category.name}
          </span>
          <div className="flex items-center gap-2">
            <Switch
              checked={category.isActive}
              className="opacity-0 transition-opacity group-hover:opacity-100"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <MoreHorizontal className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem>
                  <Edit className="mr-2 h-3 w-3" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Plus className="mr-2 h-3 w-3" />
                  Add Subcategory
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy className="mr-2 h-3 w-3" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Move className="mr-2 h-3 w-3" />
                  Move
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <Trash2 className="mr-2 h-3 w-3" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </button>
      </div>

      {/* Render children if expanded */}
      {isExpanded && hasChildren && (
        <div className="space-y-1">
          {category.children!.map((child) => (
            <CategoryNode
              key={child._id}
              category={child}
              level={level + 1}
              isSelected={isSelected}
              onSelect={onSelect}
              onToggle={onToggle}
              expandedNodes={expandedNodes}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface CategoryTreeProps {
  categories: HierarchicalCategory[];
  selectedCategory: HierarchicalCategory | null;
  onSelectCategory: (category: HierarchicalCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

function CategoryTree({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}: CategoryTreeProps) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  const handleToggleNode = (categoryId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedNodes(newExpanded);
  };

  // Filter categories based on search (flatten for search)
  const flattenCategories = (cats: HierarchicalCategory[]): HierarchicalCategory[] => {
    const result: HierarchicalCategory[] = [];
    cats.forEach(cat => {
      result.push(cat);
      if (cat.children) {
        result.push(...flattenCategories(cat.children));
      }
    });
    return result;
  };

  const filteredCategories = searchQuery
    ? flattenCategories(categories).filter(category =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : categories;

  return (
    <div className="rounded-xl border border-[var(--baladi-border)] bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-[var(--baladi-border)] p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-primary)]">
            Categories
          </h2>
          <Button
            size="sm"
            className="hover:bg-[var(--baladi-primary)]/90 h-8 bg-[var(--baladi-primary)]"
          >
            <Plus className="mr-1 h-3 w-3" />
            Add
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
          <Input
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-9 border-[var(--baladi-border)] pl-9 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
          />
        </div>
      </div>

      {/* Category List */}
      <div className="max-h-[600px] overflow-y-auto p-2">
        {/* Products without category item */}
        <div className="mb-4">
          <div className="bg-[var(--baladi-info)]/10 flex items-center gap-2 rounded-lg px-3 py-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-[var(--baladi-info)] text-white">
              <Info className="h-3 w-3" />
            </div>
            <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
              Products without category
            </span>
            <Badge variant="secondary" className="ml-auto text-xs">
              1
            </Badge>
          </div>
        </div>

        {/* Category Tree */}
        <div className="space-y-1">
          {filteredCategories.map((category) => (
            <CategoryNode
              key={category._id}
              category={category}
              level={0}
              isSelected={selectedCategory?._id === category._id}
              onSelect={onSelectCategory}
              onToggle={handleToggleNode}
              expandedNodes={expandedNodes}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(CategoryTree); 