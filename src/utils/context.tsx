import { useState, createContext, Dispatch, Context, useCallback } from 'react';

interface ProviderProps<State> {
  initialState?: Partial<State>;
  children: React.ReactNode;
}

type SetStateAction<State> = Partial<State> | ((state: State) => Partial<State>);
type ContextType<State> = Context<[State, Dispatch<SetStateAction<State>>]>;
type ProviderType<State> = (props: ProviderProps<State>) => JSX.Element;

export function generateContext<State>(initialState: State): [ContextType<State>, ProviderType<State>] {
  const Context = createContext<[State, Dispatch<SetStateAction<State>>]>([
    initialState,
    () => {},
  ]);

  const Provider = ({ children, initialState: initialState2 }: ProviderProps<State>) => {
    const [state, setState] = useState({ ...initialState, ...initialState2 });

    const newSetState = useCallback((value: SetStateAction<State>) => {
      setState(s => {
        const diff = (typeof value === 'function') ? value(s) : value;
        return { ...s, ...diff };
      });
    }, []);

    return (
      <Context.Provider value={[state, newSetState]}>
        {children}
      </Context.Provider>
    )
  }

  return [Context, Provider];
}
