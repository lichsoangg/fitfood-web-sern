import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import './Portal.scss'
const createPortalWrapper = () => {
  const element = document.createElement('div')
  element.className = 'portal__wrapper'
  return element
}

const portalWrapper = createPortalWrapper()

const Portal = React.forwardRef(({ overlay = true, children, styleContent = {}, stylePortal = {}, setOpen }, ref) => {
  useEffect(() => {
    document.body.appendChild(portalWrapper)
  }, [])

  const handleClickOutside = () => {
    setOpen(false)
  }

  const renderContent = (
    <div className='portal' style={stylePortal}>
      {overlay && <div className='overlay' onClick={handleClickOutside}></div>}
      <div className='content' style={styleContent} ref={ref || null}>
        {children}
      </div>
    </div>
  )

  return createPortal(renderContent, portalWrapper)
})

export default Portal
