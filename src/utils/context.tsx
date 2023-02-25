import { useState, createContext, Dispatch, Context } from 'react';

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

    const newSetState = (value: SetStateAction<State>) => {
      const diff = (typeof value === 'function') ? value(state) : value;
      setState({ ...state, ...diff });
    }

    return (
      <context.Provider value={[state, newSetState]}>
        {children}
      </context.Provider>
    )
  }

  return [context, useProvider];
}
