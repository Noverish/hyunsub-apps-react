import { useState, createContext, Dispatch, Context, useCallback } from 'react';

interface ProviderProps {
  children: React.ReactNode;
}

type SetStateAction<State> = Partial<State> | ((state: State) => Partial<State>);
type ContextType<State> = Context<[State, Dispatch<SetStateAction<State>>]>;
type ProviderType = ({ children }: ProviderProps) => JSX.Element;

export function generateContext<State>(initialState: State): [ContextType<State>, ProviderType] {
  const context = createContext<[State, Dispatch<SetStateAction<State>>]>([
    initialState,
    () => {},
  ]);

  const useProvider = ({ children }: ProviderProps) => {
    const [state, setState] = useState(initialState);

    const newSetState = useCallback((value: SetStateAction<State>) => {
      setState(s => {
        const diff = (typeof value === 'function') ? value(s) : value;
        return { ...s, ...diff };
      });
    }, []);

    return (
      <context.Provider value={[state, newSetState]}>
        {children}
      </context.Provider>
    )
  }

  return [context, useProvider];
}
