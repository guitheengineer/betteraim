import { ActionTypes, State, Actions } from './types';
import {
  useContext,
  createContext,
  ReactNode,
  useReducer,
  Dispatch,
  useMemo,
} from 'react';
import { gameReducer, initialState } from './reducer';

export const Context = createContext<[State, Dispatch<Actions>] | null>(null);

export const useGame = () => {
  // Context creation
  const context = useContext(Context);

  if (!context) {
    throw new Error('useGame must be used inside a Provider');
  }
  const [state, dispatch] = context;

  // Actions
  const setClick = (click: boolean) =>
    dispatch({ type: ActionTypes.setClick, payload: click });
  const setIsResizing = (isResizing: boolean) =>
    dispatch({ type: ActionTypes.setIsResizing, payload: isResizing });

  const setIsGaming = (isGaming: 'start' | 'rejected' | 'passed' | boolean) =>
    dispatch({ type: ActionTypes.setIsGaming, payload: isGaming });

  const setTimer = (timer: number | string) => {
    dispatch({ type: ActionTypes.setTimer, payload: timer });
  };

  const setClickQuantity = (quantity: 'increase' | 'decrease' | number) =>
    dispatch({ type: ActionTypes.setClickQuantity, payload: quantity });

  const setBubbles = ({
    type,
    content,
  }: {
    type: 'add' | 'delete' | 'update-position' | 'reset' | 'update-position-to';
    content?:
      | number
      | { id: string; width: string; height: string; bubbleSize: number };
  }) => dispatch({ type: ActionTypes.setBubbles, payload: { type, content } });

  const setPhase = (phase: 'increase' | number) =>
    dispatch({ type: ActionTypes.setPhase, payload: phase });

  const setIsDragable = (isDragable?: boolean) =>
    dispatch({ type: ActionTypes.setIsDragable, payload: isDragable });
  const setIsPaused = (isPaused?: boolean) =>
    dispatch({ type: ActionTypes.setIsPaused, payload: isPaused });
  const setSituation = (situation?: '' | 'passed' | 'rejected') =>
    dispatch({ type: ActionTypes.setSituation, payload: situation });
  const setIsWindowFetched = (isWindowFetched: boolean) =>
    dispatch({
      type: ActionTypes.setIsWindowFetched,
      payload: isWindowFetched,
    });

  const setIsFullScreen = (isFullScreen?: boolean) =>
    dispatch({ type: ActionTypes.setIsFullScreen, payload: isFullScreen });

  const setWindowData = ({
    type,
    content,
  }: {
    type: 'barGoalDimensions' | 'barOptionsDimensions' | 'windowDimensions';
    content?: { x: number; y: number } | { width: number; height: number };
  }) =>
    dispatch({ type: ActionTypes.setWindowData, payload: { type, content } });

  const setIsDraging = (isDraging: boolean) => {
    dispatch({ type: ActionTypes.setIsDraging, payload: isDraging });
  };
  const setResetWindows = (resetWindows: boolean) => {
    dispatch({ type: ActionTypes.setResetWindows, payload: resetWindows });
  };
  return {
    state,
    setClick,
    setIsResizing,
    setIsGaming,
    setTimer,
    setClickQuantity,
    setBubbles,
    setPhase,
    setIsDragable,
    setIsPaused,
    setSituation,
    setIsWindowFetched,
    setIsFullScreen,
    setWindowData,
    setIsDraging,
    setResetWindows,
  };
};

export const useTour = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('useGame must be used inside a Provider');
  }
  const [state, dispatch] = context;

  const setTour = (isOpen: boolean) =>
    dispatch({ type: ActionTypes.setTour, payload: isOpen });
  return { state, setTour, dispatch };
};

// Provider
type GameProps = {
  children: ReactNode;
};

export const Provider = ({ children }: GameProps) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const { state: memoState } = useMemo(() => ({ state, dispatch }), [state]);
  return (
    <Context.Provider value={[memoState, dispatch]}>
      {children}
    </Context.Provider>
  );
};

export default Provider;
