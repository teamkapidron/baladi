export enum ReactQueryKeys {
  // Auth
  GET_ADMIN_DATA = 'GET::/admin/auth/me',

  // Products
  GET_ALL_PRODUCTS = 'GET::/product/all',
  GET_LOW_STOCK_PRODUCTS = 'GET::/product/low-stock',
  GET_TOP_PRODUCTS = 'GET::/product/top',

  // Users
  GET_ALL_USERS = 'GET::/user/all',
  GET_USER_DETAILS = 'GET::/user/:userId',
  GET_USER_REGISTRATION_GRAPH_DATA = 'GET::/user/graph/registration',
  GET_USER_STATS = 'GET::/user/stats',
  GET_TOP_USERS = 'GET::/user/top',

  // Orders
  GET_ALL_ORDERS = 'GET::/order/all',
  GET_ORDER_DETAILS = 'GET::/order/:orderId',
  GET_ORDER_STATS = 'GET::/order/stats',
  GET_ORDER_REVENUE_STATS = 'GET::/order/revenue-stats',
  GET_ORDER_STATUS_GRAPH_DATA = 'GET::/order/graph/status',
  GET_ORDER_REVENUE_GRAPH_DATA = 'GET::/order/graph/revenue',
  GET_RECENT_ORDERS = 'GET::/order/recent',

  // Categories
  GET_ALL_CATEGORIES = 'GET::/category/all',
  GET_ALL_CATEGORIES_FLATTENED = 'GET::/category/all/flattened',
  GET_CATEGORY_DETAILS = 'GET::/category/:categoryId',
  GET_CATEGORY_STATS = 'GET::/category/stats',
}
