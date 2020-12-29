export interface State {
  windowDimensions: { x: number; y: number; width: number; height: number };
  barGoalDimensions: { x: number; y: number; width: number; height: number };
  barOptionsDimensions: { x: number; y: number; width: number; height: number };
  isTourOpen: boolean;
  isResizing: boolean;
  isDragable: boolean;
  isDraging: boolean;
  isPaused: boolean;
  isGaming: boolean;
  resetWindows: boolean;
  isWindowFetched: boolean;
  points: number;
  click: boolean;
  bubbles: any[];
  bubbleSize: number;
  phase: number;
  timer: number;
  clickQuantity: number;
  bubblesQuantity: number;
  meta: number;
  situation: 'passed' | 'rejected' | 'start' | '';
  isFullScreen: boolean;
}

export interface Actions {
  type: ActionTypes;
  payload?: any;
}

export enum ActionTypes {
  setTour = 'SET_TOUR',
  setClick = 'SET_CLICK',
  setIsResizing = 'SET_RESIZING',
  setIsGaming = 'SET_GAMING',
  setTimer = 'SET_TIMER',
  setClickQuantity = 'SET_CLICK_QUANTITY',
  setBubbles = 'SET_BUBBLES',
  setPhase = 'SET_PHASE',
  setIsDragable = 'SET_DRAGABLE',
  setIsPaused = 'SET_PAUSED',
  setSituation = 'SET_SITUATION',
  setIsWindowFetched = 'SET_WINDOW_FETCHED',
  setIsFullScreen = 'SET_FULLSCREEN',
  setWindowData = 'SET_WINDOW_DATA',
  setIsDraging = 'SET_IS_DRAGING',
  setResetWindows = 'SET_RESET_WINDOWS',
}
