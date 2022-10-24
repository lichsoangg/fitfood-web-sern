import React from 'react';
import LayoutComponents from '../LayoutComponents/LayoutComponents';
import "./Footer.scss";
import facebookIcon from "../../../assets/svg/facebook.svg";
import instagramIcon from "../../../assets/svg/instagram.svg";
import twitterIcon from "../../../assets/svg/twitter.svg";

export default function Footer() {
    return (
        <FooterWrapper>
            <Footer.Top>
                <LayoutComponents.Logo />
                <LayoutComponents.Menu />
                <LayoutComponents.Contact />
            </Footer.Top>
            <Footer.Center />
            <Footer.Bottom />
        </FooterWrapper>
    );
}


function FooterWrapper({ children }) {
    return (
        <div className='footer'>
            {
                children
            }
        </div>
    );

}

function Top({ children }) {
    return (
        <div className="footer__top">
            {children}
        </div>
    );

}

function Center() {
    return (
        <div className="footer__center">
            <a href='https://github.com/tranhakhanhduy'>
                <img src={facebookIcon} alt="Fitfood facebook" />
            </a>
            <a href='https://github.com/tranhakhanhduy'>
                <img src={instagramIcon} alt="Fitfood instagram" />
            </a>
            <a href='https://github.com/tranhakhanhduy'>
                <img src={twitterIcon} alt="Fitfood twitter" />
            </a>
        </div>

    );
}

function Bottom() {
    return (
        <div className="footer__bottom body5">
            <span>Bảo mật và điều khoản</span>
            <span>© 2022 Một sản phẩm của KhanhDuy</span>
        </div>
    );
}


Footer.Top = Top;
Footer.Center = Center;
Footer.Bottom = Bottom;

