import React from 'react'
import Portal from '../Portal/Portal'

const ModalBase = React.forwardRef(({ children, styleContent, setOpen }, ref) => {
  return (
    <Portal
      overlay={true}
      ref={ref}
      styleContent={{
        ...styleContent,
        backgroundColor: 'white',
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px',
        borderRadius: '8px',
        padding: '32px'
      }}
      stylePortal={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      setOpen={setOpen}
    >
      {children}
    </Portal>
  )
})

export default ModalBase
