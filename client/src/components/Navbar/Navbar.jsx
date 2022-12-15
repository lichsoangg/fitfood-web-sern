import React, { createContext, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.scss'
const NavbarContext = createContext(null)
export default function Navbar({ children, toggle, setToggle }) {
  return (
    <NavbarContext.Provider value={{ toggle, setToggle }}>
      <div className='navbar'>{children}</div>
    </NavbarContext.Provider>
  )
}

function NavbarToggle() {
  const { toggle, setToggle } = useContext(NavbarContext)
  const handleClickToggle = () => {
    setToggle(!toggle)
  }
  return (
    <div className='navbar__toggle' onClick={handleClickToggle}>
      <div className='navbar__toggle--icon' style={{ transform: `${toggle ? 'rotate(180deg)' : ''}` }}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512' width='20px' height='20px'>
          <path d='M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z' />
        </svg>
      </div>
    </div>
  )
}

Navbar.Toggle = NavbarToggle

function NavbarItem({ navigate, image, title, Svg, ...rest }) {
  const { toggle } = useContext(NavbarContext)
  return (
    <>
      {navigate ? (
        <NavLink to={navigate} className='navbar__item' {...rest}>
          <div className='navbar__item--image'>
            {image && <img src={image} alt='Navbar' />}
            {Svg && <Svg />}
          </div>
          <span
            className='navbar__item--title'
            style={{ width: `${toggle ? '100%' : '0%'}`, marginLeft: `${toggle ? '20px' : ''}` }}
          >
            {title}
          </span>
        </NavLink>
      ) : (
        <div className='navbar__item'>
          <div className='navbar__item--image'>
            {image && <img src={image} alt='Navbar' />}
            {Svg && <Svg />}
          </div>
          <span
            className='navbar__item--title'
            style={{ width: `${toggle ? '100%' : '0%'}`, marginLeft: `${toggle ? '20px' : ''}` }}
          >
            {title}
          </span>
        </div>
      )}
    </>
  )
}
Navbar.Item = NavbarItem

function NavbarBorder() {
  return <div className='navbar__border'></div>
}
Navbar.Border = NavbarBorder

function NavbarList({ children }) {
  return <div className='navbar__list'>{children}</div>
}
Navbar.List = NavbarList
