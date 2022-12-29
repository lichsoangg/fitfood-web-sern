import React from 'react'
import './Buttons.scss'
export function ThreeDimensionButton({ children, handleClickButton }) {
  return (
    <div className='button-three-dimension' onClick={handleClickButton}>
      {children}
    </div>
  )
}

export function BoxShadowButton({ children }) {
  return <div className='button-box-shadow'>{children}</div>
}
export function MainButton({ children, ...rest }) {
  return (
    <div className='button-main' {...rest}>
      {children}
    </div>
  )
}
export function InputButton({ children, ...rest }) {
  return (
    <div className='button-main'  {...rest} >
      <span> {children}</span>
      <input type='file' className='button-main__input' />
    </div>
  )
}
const AcceptButton = React.forwardRef(({ children, width, styleButton, ...rest }, ref) => {
  return (
    <button className='button-accept' style={{ width: `${width}`, ...styleButton }} {...rest} ref={ref || null}>
      {children}
    </button>
  )
})
export { AcceptButton }

export function CancelButton({ children, width, styleButton, ...rest }) {
  return (
    <button className='button-cancel' type='button' style={{ width: `${width}`, ...styleButton }} {...rest}>
      {children}
    </button>
  )
}
