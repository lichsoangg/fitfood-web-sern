import React from 'react'
import Portal from '../Portal/Portal'
import PropTypes from 'prop-types'
export default function DropdownBase({ rect, alignRight, width, children, setOpen }) {
  let leftStyle = `${rect?.left + window?.scrollX}px`

  let widthValue = width ? width : rect?.width
  let widthStyle = `${widthValue}px`
  if (alignRight) {
    leftStyle = `${rect?.left + rect?.width - widthValue + window?.scrollX}px`
  }
  return (
    <Portal
      styleContent={{
        position: 'absolute',
        left: leftStyle,
        top: `${rect?.top + rect?.height + window?.scrollY + 4}px`,
        width: widthStyle
      }}
      setOpen={setOpen}
    >
      {children}
    </Portal>
  )
}

DropdownBase.propTypes = {
  rect: PropTypes.shape({
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
  }).isRequired
}
