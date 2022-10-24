import React from 'react';
import "./LayoutComponents.scss";
import logo from "../../../assets/images/logo.png";
import cart from "../../../assets/svg/cart.svg";
import { useNavigate, Link } from 'react-router-dom';
export default function LayoutComponents() {
    return null;
}

function Logo() {
    return (
        <div className="layout__logo">
            <div className="layout__logo--image">
                <img src={logo} alt="Fitfood logo" />
            </div>
            <h1>Fitfood</h1>
        </div>
    );

}

function Menu() {
    return (
        <ul className="layout__menu body4">
            <li className="layout__menu--item">Trang chủ</li>
            <li className="layout__menu--item">Tính calo</li>
            <li className="layout__menu--item">Thực đơn</li>
            <li className="layout__menu--item">FAQs</li>
            <li className="layout__menu--item">Về chúng tôi</li>
        </ul>
    );
}

function Function() {

    return (
        <div className="layout__function">
            <div className="layout__function--cart">
                <img src={cart} alt="" />
            </div>
            <Link to="/login"> <div className="layout__function--login body2">ĐĂNG NHẬP</div></Link>
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