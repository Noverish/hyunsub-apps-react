const ApparelRoutes = {
  list: '/',

  detail: '/apparels/:apparelId',
  detailRoute: (apparelId: string) => `/apparels/${apparelId}`,

  edit: '/apparels/:apparelId/edit',
  editRoute: (apparelId: string) => `/apparels/${apparelId}/edit`,

  setting: '/setting'
}

export default ApparelRoutes;
