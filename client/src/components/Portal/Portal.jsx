
import { useEffect } from "react";
import { createPortal } from "react-dom";
import "./Portal.scss";
const createPortalWrapper = () => {
    const element = document.createElement("div");
    element.className = "portal__wrapper";
    return element;
};

const portalWrapper = createPortalWrapper();

const Portal = ({
    overlay = true,
    children,
    styleContent = {},
}) => {
    useEffect(() => {
        document.body.appendChild(portalWrapper);
    }, []);
    const renderContent = (
        <div className="portal">
            {overlay && <div className="overlay"></div>}
            <div className="    content" style={styleContent}>
                {children}
            </div>
        </div>
    );
    return createPortal(renderContent, portalWrapper);
};

export default Portal;