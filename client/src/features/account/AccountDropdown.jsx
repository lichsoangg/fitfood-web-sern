import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import manAvatar from '../../assets/images/man_avatar.png'
import womanAvatar from '../../assets/images/woman_avatar.png'
import { BoxShadowButton } from '../../components/Buttons/Buttons'
import DropdownBase from '../../components/DropdownBase/DropdownBase'
import Loading from '../../components/Loading/Loading'
import path from '../../constants/path'
import { useModal } from '../../hooks/useModal'
import { useLogoutMutation } from '../authentication/authApi'
import { logOut, selectCurrentAuth } from '../authentication/authSlice'
import { useGetMeQuery } from './accountApi'

export default function AccountDropdown() {
  const { accessToken: token, role } = useSelector(selectCurrentAuth)
  const { data } = useGetMeQuery(undefined, { skip: !token })
  const user = data?.data
  const { activeModalRef, rect, open, setOpen } = useModal()
  const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleClickLogout = async () => {
    await logout().unwrap()
    dispatch(logOut())
    navigate(path.login)
  }
  let avatar = user?.Avatar ? user?.Avatar : user?.Gender === 0 ? manAvatar : womanAvatar
  return (
    <>
      <div className='layout__function--user' ref={activeModalRef}>
        {user ? <img src={avatar} alt='Fitfood user avatar' /> : token ? <Loading size={2} color='#fdfbfa' /> : <></>}
      </div>
      {token ? (
        <>
          {open && user && (
            <DropdownBase
              rect={rect}
              width={200}
              setOpen={setOpen}
              styleContent={{ position: 'fixed', transform: `translateX(-160px)` }}
              stylePortal={{ zIndex: '100' }}
            >
              <ul className='layout__function--user-modal' onClick={() => setOpen(false)}>
                <li>{user?.Name}</li>
                <hr />
                {role !== `Khách hàng` ? <Link to={path.admin}>Trang Admin </Link> : <></>}
                <Link to={path.accountInfo}>Thông tin cá nhân </Link>
                <Link to={path.changePassword}>Đổi mật khẩu </Link>
                <hr />
                <li onClick={handleClickLogout}>Đăng xuất</li>
              </ul>
            </DropdownBase>
          )}
        </>
      ) : (
        <Link to={path.login}>
          <BoxShadowButton>Đăng nhập</BoxShadowButton>
        </Link>
      )}
      {isLogoutLoading && <Loading size={3} full />}
    </>
  )
}
