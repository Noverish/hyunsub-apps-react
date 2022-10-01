const ApparelRoutes = {
  list: '/',

  detail: '/apparels/:apparelId',
  detailRoute: (apparelId: string) => `/apparels/${apparelId}`,

  edit: '/apparels/:apparelId/edit',
  editRoute: (apparelId: string) => `/apparels/${apparelId}/edit`,

  add: '/apparels/add',

  categoryList: '/categories',
  categoryDetail: '/categories/:category',
  categoryDetailRoute: (category: string) => `/categories/${category}`,

  setting: '/setting'
}

export default ApparelRoutes;
