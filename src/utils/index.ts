export function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function isDev() {
  return !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
}

export function urlToName(url: string) {
  return decodeURIComponent(url.split('/').reverse()[0]);
}

export function numberWithComma(num: number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function filterEmptyString(obj: any): any {
  const result: any = {};

  Object.entries(obj).forEach(([k, v]) => {
    if (v !== '') {
      result[k] = v;
    }
  });

  return result;
}

export function dateToString(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');
  const second = date.getSeconds().toString().padStart(2, '0');
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

export function toDateString(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getHumanReadableSize(size: number) {
  const kb = 1000;
  const mb = 1000 * 1000;
  const gb = 1000 * 1000 * 1000;

  if (size > gb) {
    const tmp = Math.floor((size / gb) * 100) / 100;
    return `${tmp} GB`;
  }

  if (size > mb) {
    const tmp = Math.floor((size / mb) * 100) / 100;
    return `${tmp} MB`;
  }

  const tmp = Math.floor((size / kb) * 100) / 100;
  return `${tmp} KB`;
}

const BASE = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export function generateRandomString(length: number) {
  return Array.from({ length }, () => BASE.charAt(Math.floor(Math.random() * BASE.length))).join('');
}
