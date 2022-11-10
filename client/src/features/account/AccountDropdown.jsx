import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Portal from '../../components/Portal/Portal';
import { useModal } from '../../hooks/useModal';
import { selectCurrentToken } from '../authentication/authSlice';
import { useGetMeQuery } from './accountApi';
import womanAvatar from "../../assets/images/woman_avatar.png";
import manAvatar from "../../assets/images/man_avatar.png";
import { logOut } from '../authentication/authSlice';
import { useLogoutMutation } from '../authentication/authApi';
import Loading from '../../components/Loading/Loading';
export default function AccountDropdown() {
    const token = useSelector(selectCurrentToken);
    const { modalRef, activeModalRef, rect, open, setOpen } = useModal();
    const { data: user } = useGetMeQuery(undefined, { skip: !token });
    const [logout,{isLoading:isLogoutLoading}] = useLogoutMutation();
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const handleClickLogout = async () => {
        await logout().unwrap();
        dispatch(logOut());
        navigate("/dang-nhap");
    };
    return (
        <>
            <div className="layout__function--user" ref={activeModalRef} >
                {(user) ?
                    <img
                        src={`${user.Gender === 0 ? manAvatar : womanAvatar}`}
                        alt="Fitfood user avatar" /> :
                    (token) ?
                        <Loading /> :
                        <></>}
            </div>
            {(token) ?
                <>
                    {(open && user) && <Portal
                        overlay={false}
                        styleContent={{
                            position: "absolute",
                            left: `${rect.right + window.scrollX - 200}px`,
                            top: `${rect.top + rect.height + window.scrollY + 4}px`,
                            width: `${200}px`
                        }}>
                        <ul className="layout__function--user-modal"
                            ref={modalRef}
                            onClick={() => setOpen(false)}
                        >
                            <li>{user?.Name}</li>
                            <hr />
                            <Link to="/thong-tin-ca-nhan">Thông tin cá nhân </Link>
                            <Link to="/doi-mat-khau">Đổi mật khẩu </Link>
                            <hr />
                            <li onClick={handleClickLogout}>Đăng xuất</li>
                        </ul>
                    </Portal>}

                </>
                :
                <Link to="/dang-nhap">
                    <div className="layout__function--login body2">Đăng nhập</div>
                </Link>
            }
            {isLogoutLoading && <Loading size={3} full/>}
        </>
    );
}
