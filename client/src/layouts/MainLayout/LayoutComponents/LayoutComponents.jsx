import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink, useLocation } from 'react-router-dom'
import logo from '../../../assets/images/logo.png'
import { BoxShadowButton } from '../../../components/Buttons/Buttons'
import Cart from '../../../components/Cart'
import DropdownBase from '../../../components/DropdownBase/DropdownBase'
import Loading from '../../../components/Loading/Loading'
import path from '../../../constants/path'
import { selectCurrentAuth } from '../../../features/authentication/authSlice'
import { useGetPurchaseQuery } from '../../../features/purchase/purchaseApi'
import { useModal } from '../../../hooks/useModal'
import AccountDropdown from './components/AccountDropdown'
import NavLinkItem from './components/NavLinkItem'
import './LayoutComponents.scss'
export default function LayoutComponents() {
  return null
}

function Logo() {
  return (
    <Link to={path.home}>
      <div className='layout__logo' data-testid='logo-main'>
        <div className='layout__logo--image'>
          <img src={logo} alt='Fitfood logo' />
        </div>
      </div>
    </Link>
  )
}

function Menu() {
  const [coords, setCoords] = useState()
  const location = useLocation()
  useEffect(() => {
    const activeItem = document.querySelector('.layout__menu--item.active')
    if (activeItem) {
      setCoords({
        left: activeItem.offsetLeft,
        width: activeItem.offsetWidth
      })
      activeItem.style.color = '#ff2033'
    } else {
      setCoords({
        left: 0,
        width: 0
      })
      const listNotActiveNavLink = document.querySelectorAll('.layout__menu--item')
      listNotActiveNavLink.forEach((item) => {
        item.style.color = 'white'
        item.style.transform = 'scale(1)'
        item.style.opacity = '0.5'
      })
    }
  }, [location])
  const { activeModalRef, rect, open, setOpen } = useModal()
  const { accessToken: isAuthenticated } = useSelector(selectCurrentAuth)
  return (
    <>
      <ul className='layout__menu-responsive body4' ref={activeModalRef}>
        <div className='layout__menu-responsive--icon'>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5}>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5'
            />
          </svg>
        </div>
        <DropdownBase
          rect={rect}
          setOpen={setOpen}
          stylePortal={{
            opacity: `${open ? '1' : '0'}`,
            pointerEvents: `${open ? 'auto' : 'none'}`,
            transform: `${open ? 'translateX(0)' : 'translateX(-100%)'}`,
            visibility: `${open ? 'visible' : 'hidden'}`,
            height: `100vh`,
            position: 'fixed'
          }}
        >
          <div className='layout__menu-responsive--list'>
            <NavLink to={path.home} className='layout__menu-responsive--item' onClick={() => setOpen(false)} end>
              Trang chủ
            </NavLink>

            <NavLink to={path.menu} className='layout__menu-responsive--item' onClick={() => setOpen(false)}>
              Đặt hàng
            </NavLink>
            <NavLink to={path.faqs} className='layout__menu-responsive--item' onClick={() => setOpen(false)}>
              FAQs
            </NavLink>
            {isAuthenticated ? null : (
              <Link to={path.login} state={{ from: location }} onClick={() => setOpen(false)}>
                <BoxShadowButton>Đăng nhập</BoxShadowButton>
              </Link>
            )}
          </div>
        </DropdownBase>
      </ul>
      <ul className='layout__menu body4'>
        <NavLinkItem to={path.home} className='layout__menu--item' setCoords={setCoords} end>
          Trang chủ
        </NavLinkItem>

        <NavLinkItem to={path.menu} className='layout__menu--item' setCoords={setCoords}>
          Đặt hàng
        </NavLinkItem>
        <NavLinkItem to={path.faqs} className='layout__menu--item' setCoords={setCoords}>
          FAQs
        </NavLinkItem>

        <div
          className='layout__menu--underBorder'
          style={{ left: `${coords?.left}px`, width: `${coords?.width}px` }}
        ></div>
      </ul>
    </>
  )
}

function Function() {
  const { accessToken: isAuthenticated } = useSelector(selectCurrentAuth)
  const { data: productsInCartData, isFetching: isProductsInCartFetching } = useGetPurchaseQuery(
    { state: -1 },
    { skip: !isAuthenticated }
  )
  const quantityProductsInCart = productsInCartData?.data?.data?.length
  const { activeModalRef, rect, open, setOpen } = useModal()
  return (
    <div className='layout__function'>
      <div className='layout__function--cart' ref={activeModalRef}>
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
          />
        </svg>

        <DropdownBase
          rect={rect}
          setOpen={setOpen}
          stylePortal={{
            opacity: `${open ? '1' : '0'}`,
            pointerEvents: `${open ? 'auto' : 'none'}`,
            transform: `${open ? 'translateX(0)' : 'translateX(100%)'}`,
            visibility: `${open ? 'visible' : 'hidden'}`,
            height: `100vh`,
            position: 'fixed'
          }}
        >
          <Cart open={open} setOpen={setOpen} />
        </DropdownBase>

        <div className='quantity' style={{ display: `${quantityProductsInCart ? 'flex' : 'none'}` }}>
          {isProductsInCartFetching ? (
            <Loading size={1} color={'white'} />
          ) : quantityProductsInCart ? (
            quantityProductsInCart
          ) : (
            ''
          )}
        </div>
      </div>
      <AccountDropdown />
    </div>
  )
}

function Contact() {
  return (
    <div className='layout__contact'>
      <span className='body3'>Contact:</span>
      <h4>
        <a href='tel:0333521488'>0333521488</a>
      </h4>
    </div>
  )
}
LayoutComponents.Logo = Logo
LayoutComponents.Menu = Menu
LayoutComponents.Function = Function
LayoutComponents.Contact = Contact
