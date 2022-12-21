const DriveRoutes = {
  explorer: '/explorer',
  explorerRoute: (path: string) => `/explorer?path=${encodeURIComponent(path)}`,

  rename: '/rename',
  renameRoute: (path: string) => `/rename?path=${encodeURIComponent(path)}`,
}

export default DriveRoutes;
