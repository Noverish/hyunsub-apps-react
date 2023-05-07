const ApparelRoutes = {
  list: '/',

  detailRoute: '/apparels/:apparelId',
  detail: (apparelId: string) => `/apparels/${apparelId}`,

  editRoute: '/apparels/:apparelId/edit',
  edit: (apparelId: string) => `/apparels/${apparelId}/edit`,

  add: '/apparels/add',

  categoryList: '/categories',

  categoryDetailRoute: '/categories/:category',
  categoryDetail: (category: string) => `/categories/${category}`,

  brandList: '/brands',

  brandDetailRoute: '/brands/:brand',
  brandDetail: (brand: string) => `/brands/${brand}`,

  menu: '/menu',
};

export default ApparelRoutes;
