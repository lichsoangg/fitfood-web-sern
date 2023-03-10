import React from 'react'
import dangerIcon from '../../assets/svg/danger.svg'
import './Error.scss'
export default function Error({ errorMessage, styleError, children }) {
  return (
    <div className='error' style={styleError}>
      {errorMessage || children ? (
        <>
          <img src={dangerIcon} alt='danger icon fitfood' className='error__image' />
          {errorMessage && <span className='error__message'>{errorMessage}</span>}
          {children && <span className='error__message'>{children}</span>}
        </>
      ) : null}
    </div>
  )
}
