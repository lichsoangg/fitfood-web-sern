import React from 'react';
import "./Header.scss";

import LayoutComponents from '../LayoutComponents/LayoutComponents';
export default function Header() {
    return (
        <HeaderWrapper>

            <LayoutComponents.Logo />
            <LayoutComponents.Menu />
            <LayoutComponents.Function />
        </HeaderWrapper>
    );
}

function HeaderWrapper({ children }) {
    return (
        <div className='header'>
            <div className="mainWrapper">
                {children}
            </div>
        </div>
    );
}






