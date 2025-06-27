export interface CategoryStats {
  totalCategories: number;
  nestedCategories: number;
  activeCategories: number;
  inactiveCategories: number;
}

export interface CategoryGraphData {
  categories: [
    {
      name: string;
      totalRevenue: number;
      grossProfit: number;
      totalWastage: number;
    },
  ];
}
