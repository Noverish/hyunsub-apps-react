import { Base64 } from 'js-base64';

const ComicRoutes = {
  list: '/',

  detail: '/comics/:name',
  detailRoute: (name: string) => `/comics/${Base64.encodeURI(name)}`,

  viewer: '/comics/:name/episodes/:episode',
  viewerRoute: (name: string, episode: string) => `/comics/${Base64.encodeURI(name)}/episodes/${Base64.encodeURI(episode)}`
}

export default ComicRoutes;
