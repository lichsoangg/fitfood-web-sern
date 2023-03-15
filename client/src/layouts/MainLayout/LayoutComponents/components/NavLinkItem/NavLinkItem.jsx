import { useCallback, useEffect, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import useHover from '../../../../../hooks/useHover'

export default function NavLinkItem({ children, setCoords, ...rest }) {
  const hoverRef = useRef()
  const location = useLocation()

  useEffect(() => {
    handleForItem({ hover: false })
  }, [location.pathname])

  const callbackMouseOver = useCallback(() => {
    const node = hoverRef.current
    if (node) {
      handleForItem({ hover: true })
      node.style.color = '#ff2033'
      node.style.transform = 'scale(1.2)'
      node.style.opacity = '1'
      setCoords({ left: node?.offsetLeft, width: node?.offsetWidth })
    }
  }, [setCoords])
  const callbackMouseOut = useCallback(() => {
    handleForItem({ hover: false })
    const activeNavLink = document.querySelector('.layout__menu--item.active')
    if (activeNavLink) {
      setCoords({ left: activeNavLink?.offsetLeft, width: activeNavLink?.offsetWidth })
      activeNavLink.style.color = '#ff2033'
    } else {
      setCoords({ left: 0, width: 0 })
      activeNavLink.style.color = '#ff2033'
    }
  }, [setCoords])
  useHover(hoverRef, callbackMouseOver, callbackMouseOut)

  return (
    <NavLink className='layout__menu--item' {...rest} ref={hoverRef}>
      {children}
    </NavLink>
  )
}

function handleForItem({ hover }) {
  const listNotActiveNavLink = document.querySelectorAll('.layout__menu--item')
  listNotActiveNavLink.forEach((item) => {
    item.style.color = 'white'
    item.style.transform = 'scale(1)'
    item.style.opacity = '0.5'
    if (!hover) {
      item.style.opacity = '1'
    }
  })
}
