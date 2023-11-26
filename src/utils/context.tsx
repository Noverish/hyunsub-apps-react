import { produce } from 'immer';
import { Context, Dispatch, createContext, useCallback, useContext, useState } from 'react';

interface StateProviderProps<State> {
  children: React.ReactNode;
  initialState?: Partial<State>;
}

type SetStateAction<State> = Partial<State> | ((state: State) => State | void | undefined);
type StateContextType<State> = Context<[State, Dispatch<SetStateAction<State>>]>;
type StateProviderType<State> = (props: StateProviderProps<State>) => JSX.Element;

export function generateStateContext<State>(
  initialState: State,
  logging: boolean = false,
): [StateContextType<State>, StateProviderType<State>] {
  const Context = createContext<[State, Dispatch<SetStateAction<State>>]>([initialState, () => {}]);

  const Provider = ({ children, initialState: initialState2 }: StateProviderProps<State>) => {
    // spread를 쓰지 않으면 다른 곳에서 state 직접 변경을 시도하는 경우,
    // initialState도 변경되어서 Provider가 재생성될 때 예상하지 못한 동작이 있을 수 있음
    const [state, setState] = useState({ ...initialState, ...initialState2 });

    const newSetState = useCallback((value: SetStateAction<State>) => {
      if (logging) {
        console.log('StateContext', value);
      }
      setState((s) => (typeof value === 'function' ? produce(s, value) : { ...s, ...value }));
    }, []);

    return <Context.Provider value={[state, newSetState]}>{children}</Context.Provider>;
  };

  return [Context, Provider];
}

interface ValueProviderProps<V> {
  children: React.ReactNode;
  value: V;
}

type ValueContextType<V> = Context<V>;
type ValueProviderType<V> = (props: ValueProviderProps<V>) => JSX.Element;
type UseContextType<V> = () => V;

export function generateValueContext<V>(
  logging: boolean = false,
): [ValueContextType<V>, ValueProviderType<V>, UseContextType<V>] {
  const Context = createContext<V>(undefined as any);

  const Provider = ({ children, value }: ValueProviderProps<V>) => {
    if (logging) {
      console.log('ValueContext', value);
    }
    return <Context.Provider value={value}>{children}</Context.Provider>;
  };

  const useValueContext = () => {
    const value = useContext(Context);
    if (value) {
      return value;
    }
    throw new Error();
  };

  return [Context, Provider, useValueContext];
}
