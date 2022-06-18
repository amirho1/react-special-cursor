export interface IStyles {
  [element: string]: React.CSSProperties;
}

export type CursorChildrenType = JSX.Element | string | undefined | number;

export interface hoverStyle {
  classNameOfTargetElement: string;
  classNameOfStyle: string;
  cursorChildren?: CursorChildrenType;
}
