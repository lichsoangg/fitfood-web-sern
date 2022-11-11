import React from 'react';
import "./Buttons.scss";

export function ThreeDimensionButton({ children, handleClickButton }) {
  return (
    <div className='button-three-dimension' href="#" onClick={handleClickButton}>
      {children}
    </div>
  );
}

export function BoxShadowButton({ children }) {
  return (
    <div className='button-box-shadow'>
      {children}
    </div>
  );
}

export function AcceptButton({ children, width, styleButton, ...rest }) {
  return (
    <button
      className='button-main button-accept'
      style={{ width: `${width}`, ...styleButton }}
      {...rest}
    >
      {children}
    </button>
  );
}

export function CancelButton({ children, width,styleButton, ...rest }) {
  return (
    <button
      className='button-main button-cancel'
      style={{ width: `${width}`, ...styleButton }}
      {...rest}
    >
      {children}
    </button>
  );
}
