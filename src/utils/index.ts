import { FieldPath, FieldPathValue, FieldValues, UseControllerProps } from 'node_modules/react-hook-form/dist/types';
import { useController } from 'react-hook-form';

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

export function useControlProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: UseControllerProps<TFieldValues, TName>,
): {
  value: FieldPathValue<TFieldValues, TName>;
  onChange: (...event: any[]) => void;
} {
  const { field } = useController(props);
  return { value: field.value, onChange: field.onChange };
}
