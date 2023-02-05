export interface Service {
  name: string;
  icon: string;
  title: string;
};

const services: Service[] = [
  {
    name: 'video',
    icon: 'fas fa-film',
    title: 'Video',
  },
  {
    name: 'photo',
    icon: 'fas fa-camera',
    title: 'Photo',
  },
  {
    name: 'comic',
    icon: 'fas fa-book',
    title: 'Comic',
  },
  {
    name: 'apparel',
    icon: 'fas fa-tshirt',
    title: 'Apparel',
  },
  {
    name: 'drive',
    icon: 'fas fa-hdd',
    title: 'Drive',
  },
  {
    name: 'agnam',
    icon: 'fas fa-torii-gate',
    title: 'Agnam',
  }
];

export default services;
