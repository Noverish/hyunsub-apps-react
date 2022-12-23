const DriveRoutes = {
  explorer: '/explorer',
  explorerRoute: (path: string) => `/explorer?path=${encodeURIComponent(path)}`,

  rename: '/rename',
  renameRoute: (path: string) => `/rename?path=${encodeURIComponent(path)}`,

  move: '/move',
  moveRoute: (path: string, path2: string) => `/move?path=${encodeURIComponent(path)}&path2=${encodeURIComponent(path2)}`
}

export default DriveRoutes;
