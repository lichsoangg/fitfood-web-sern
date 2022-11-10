import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from "../../../assets/images/logo.png";
import cart from "../../../assets/svg/cart.svg";
import AccountDropdown from '../../../features/account/AccountDropdown';
import "./LayoutComponents.scss";
export default function LayoutComponents() {
    return null;
}


function Logo() {
    return (
        <Link to="/">
        <div className="layout__logo">
            <div className="layout__logo--image">
                <img src={logo} alt="Fitfood logo" />
            </div>
            <h1>Fitfood</h1>
        </div>
        </Link>
    );
}

function Menu() {
    const [coords, setCoords] = useState();
    const location = useLocation();
    useEffect(() => {

        const activeItem = document.querySelector(".layout__menu--item.active");
        if (activeItem) {
            setCoords({
                left: activeItem.offsetLeft,
                width: activeItem.offsetWidth,
            });
        } else {
            setCoords({
                left: 0,
                width: 0,
            });
        }

    }, [location]);

    return (
        <ul className="layout__menu body4" >
            <NavLink to="/" className="layout__menu--item" end>Trang chủ</NavLink>
            <NavLink to="/tinh-calo" className="layout__menu--item">Tính calo</NavLink>
            <NavLink to="/thuc-don" className="layout__menu--item">Thực đơn</NavLink>
            <NavLink to="/faqs" className="layout__menu--item">FAQs</NavLink>
            <NavLink to="/ve-chung-toi" className="layout__menu--item">Về chúng tôi</NavLink>
            <div className="layout__menu--underBorder" style={{ left: `${coords?.left}px`, width: `${coords?.width}px` }}></div>
        </ul>
    );
}

function Function() {
  
    return (
        <div className="layout__function">
            <div className="layout__function--cart">
                <img src={cart} alt="" />
            </div>
            <AccountDropdown/>
        </div>
    );
}

function Contact() {
    return (
        <div className="layout__contact">
            <span className='body3'>Contact:</span>
            <h4><a href='tel:0333521488'>0333521488</a></h4>
        </div>
    );
}
LayoutComponents.Logo = Logo;
LayoutComponents.Menu = Menu;
LayoutComponents.Function = Function;
LayoutComponents.Contact = Contact;