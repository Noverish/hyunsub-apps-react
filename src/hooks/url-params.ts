import { useParams, useSearchParams } from 'react-router-dom';

export function useUrlParams(...names: string[]): string[] {
  const params = useParams();
  const [searchParams] = useSearchParams();

  const result: string[] = [];

  for (const name of names) {
    const candidate1 = params[name];
    const candidate2 = searchParams.get(name);
    if (candidate1) {
      result.push(candidate1);
    } else if (candidate2) {
      result.push(candidate2);
    } else {
      throw new Error(`No such url parameter: ${name}`);
    }
  }

  return result;
}

export function useOptionalUrlParams(...names: string[]): (string | undefined)[] {
  const params = useParams();
  const [searchParams] = useSearchParams();

  const result: (string | undefined)[] = [];

  for (const name of names) {
    const candidate1 = params[name];
    const candidate2 = searchParams.get(name);
    if (candidate1) {
      result.push(candidate1);
    } else if (candidate2) {
      result.push(candidate2);
    } else {
      result.push(undefined);
    }
  }

  return result;
}
