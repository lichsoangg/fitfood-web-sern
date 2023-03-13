import React from 'react'
import { useDisableClick } from '../../hooks/useDisableClick'
import './Buttons.scss'
import Loading from '../../components/Loading/Loading'
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
    <div className='button-main'>
      <span> {children}</span>
      <input type='file' className='button-main__input' {...rest} />
    </div>
  )
}
const AcceptButton = React.forwardRef(({ children, width, styleButton, isLoading, ...rest }, ref) => {
  useDisableClick(isLoading)
  return (
    <button
      className='button-accept'
      style={{ width: `${width}`, opacity: `${isLoading ? '0.6' : '1'}`, ...styleButton }}
      {...rest}
      ref={ref || null}
    >
      {isLoading ? <Loading color={'white'} /> : children}
    </button>
  )
})
export { AcceptButton }

const HoverButton = React.forwardRef(({ children, width, styleButton, isLoading, ...rest }, ref) => {
  useDisableClick(isLoading)
  return (
    <button
      className='button-hover'
      style={{ width: `${width}`, opacity: `${isLoading ? '0.6' : '1'}`, ...styleButton }}
      {...rest}
      ref={ref || null}
    >
      {isLoading ? <Loading color={'white'} /> : children}
    </button>
  )
})
export { HoverButton }

export function CancelButton({ children, width, styleButton, ...rest }) {
  return (
    <button className='button-cancel' type='button' style={{ width: `${width}`, ...styleButton }} {...rest}>
      {children}
    </button>
  )
}
