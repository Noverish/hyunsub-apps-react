const _ServiceCode = {
  video: 'video',
  photo: 'photo',
  comic: 'comic',
  apparel: 'apparel',
  drive: 'drive',
  agnam: 'agnam',
  git: 'git',
  diary: 'diary',
  friend: 'friend',
} as const;

export type ServiceCode = (typeof _ServiceCode)[keyof typeof _ServiceCode];

export interface Service {
  code: ServiceCode;
  icon: string;
  title: string;
  documentTitle?: string;
}

const services: Service[] = [
  {
    code: 'video',
    icon: 'fas fa-film',
    title: 'Video',
    documentTitle: 'Hyunflix',
  },
  {
    code: 'photo',
    icon: 'fas fa-camera',
    title: 'Photo',
  },
  {
    code: 'comic',
    icon: 'fas fa-laugh-beam',
    title: 'Comic',
  },
  {
    code: 'apparel',
    icon: 'fas fa-tshirt',
    title: 'Apparel',
  },
  {
    code: 'drive',
    icon: 'fas fa-hdd',
    title: 'Drive',
  },
  {
    code: 'agnam',
    icon: 'fas fa-torii-gate',
    title: 'Agnam',
  },
  {
    code: 'git',
    icon: 'fab fa-git-alt',
    title: 'Git',
  },
  {
    code: 'diary',
    icon: 'fas fa-book',
    title: 'Diary',
  },
  {
    code: 'friend',
    icon: 'fas fa-users',
    title: 'Friend',
  },
];

export default services;

function getService(code: ServiceCode): Service | undefined {
  return services.filter((v) => v.code === code)[0];
}

export function setDocumentTitle(title: string) {
  const code = window.location.hostname.split('.')[0].replace('local-', '') as ServiceCode;
  const service = getService(code);
  const documentTitle = service?.documentTitle ?? service?.title;
  const documentTitleSuffix = documentTitle ? ` - ${documentTitle}` : '';
  window.document.title = `${title}${documentTitleSuffix}`;
}
