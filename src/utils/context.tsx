import { produce } from 'immer';
import { Context, Dispatch, createContext, useCallback, useContext, useState } from 'react';

interface StateProviderProps {
  children: React.ReactNode;
}

type SetStateAction<State> = Partial<State> | ((state: State) => State | void | undefined);
type StateContextType<State> = Context<[State, Dispatch<SetStateAction<State>>]>;
type StateProviderType = (props: StateProviderProps) => JSX.Element;

export function generateStateContext<State>(initialState: State): [StateContextType<State>, StateProviderType] {
  const Context = createContext<[State, Dispatch<SetStateAction<State>>]>([
    initialState,
    () => { },
  ]);

  const Provider = ({ children }: StateProviderProps) => {
    // spread를 쓰지 않으면 다른 곳에서 state 직접 변경을 시도하는 경우,
    // initialState도 변경되어서 Provider가 재생성될 때 예상하지 못한 동작이 있을 수 있음
    const [state, setState] = useState({ ...initialState });

    const newSetState = useCallback((value: SetStateAction<State>) => {
      setState(s => (typeof value === 'function') ? produce(s, value) : { ...s, ...value });
    }, []);

    return (
      <Context.Provider value={[state, newSetState]}>
        {children}
      </Context.Provider>
    )
  }

  return [Context, Provider];
}

interface ValueProviderProps<V> {
  children: React.ReactNode;
  value: V;
}

type ValueContextType<V> = Context<V | undefined>;
type ValueProviderType<V> = (props: ValueProviderProps<V>) => JSX.Element;
type UseContextType<V> = () => V;

export function generateValueContext<V>(): [ValueContextType<V>, ValueProviderType<V>, UseContextType<V>] {
  const Context = createContext<V | undefined>(undefined);

  const Provider = ({ children, value }: ValueProviderProps<V>) => {
    return (
      <Context.Provider value={value}>
        {children}
      </Context.Provider>
    )
  }

  const useValueContext = () => {
    const value = useContext(Context);
    if (value) {
      return value;
    }
    throw new Error();
  }

  return [Context, Provider, useValueContext];
}
