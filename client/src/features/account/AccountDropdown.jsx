import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useModal } from '../../hooks/useModal';
import { selectCurrentAuth } from '../authentication/authSlice';
import { useGetMeQuery } from './accountApi';
import womanAvatar from '../../assets/images/woman_avatar.png';
import manAvatar from '../../assets/images/man_avatar.png';
import { logOut } from '../authentication/authSlice';
import { useLogoutMutation } from '../authentication/authApi';
import Loading from '../../components/Loading/Loading';
import { BoxShadowButton } from '../../components/Buttons/Buttons';
import DropdownBase from '../../components/DropdownBase/DropdownBase';

export default function AccountDropdown() {
  const { accessToken: token, role } = useSelector(selectCurrentAuth);
  const { data: user } = useGetMeQuery(undefined, { skip: !token });
  const { modalRef, activeModalRef, rect, open, setOpen } = useModal();
  const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClickLogout = async () => {
    await logout().unwrap();
    dispatch(logOut());
    navigate('/dang-nhap');
  };
  let avatar = user?.Avatar ? user?.Avatar : user?.Gender === 0 ? manAvatar : womanAvatar;

  return (
    <>
      <div className='layout__function--user' ref={activeModalRef}>
        {user ? <img src={avatar} alt='Fitfood user avatar' /> : token ? <Loading size={2} color='#fdfbfa' /> : <></>}
      </div>
      {token ? (
        <>
          {open && user && (
            <DropdownBase rect={rect} width={200} alignRight>
              <ul className='layout__function--user-modal' ref={modalRef} onClick={() => setOpen(false)}>
                <li>{user?.Name}</li>
                <hr />
                {role !== `Khách hàng` ? <Link to='/admin'>Trang Admin </Link> : <></>}
                <Link to='/thong-tin-ca-nhan'>Thông tin cá nhân </Link>
                <Link to='/doi-mat-khau'>Đổi mật khẩu </Link>
                <hr />
                <li onClick={handleClickLogout}>Đăng xuất</li>
              </ul>
            </DropdownBase>
          )}
        </>
      ) : (
        <Link to='/dang-nhap'>
          <BoxShadowButton>Đăng nhập</BoxShadowButton>
        </Link>
      )}
      {isLogoutLoading && <Loading size={3} full />}
    </>
  );
}
