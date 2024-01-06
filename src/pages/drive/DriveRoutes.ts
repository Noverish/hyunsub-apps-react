const DriveRoutes = {
  explorerRoute: '/explorer',
  explorer: (path: string) => `/explorer?path=${path.replace('+', encodeURIComponent('+'))}`,
};

export default DriveRoutes;
