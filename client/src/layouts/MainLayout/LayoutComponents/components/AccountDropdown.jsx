import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import manAvatar from '../../../../assets/images/man_avatar.png'
import womanAvatar from '../../../../assets/images/woman_avatar.png'
import { BoxShadowButton } from '../../../../components/Buttons/Buttons'
import DropdownBase from '../../../../components/DropdownBase/DropdownBase'
import Loading from '../../../../components/Loading/Loading'
import path from '../../../../constants/path'
import { useModal } from '../../../../hooks/useModal'
import { useLogoutMutation } from '../../../../features/authentication/authApi'
import { logOut, selectCurrentAuth } from '../../../../features/authentication/authSlice'
import { useGetMeQuery } from '../../../../features/account/accountApi'
import { ROLES } from '../../../../constants/utils'

export default function AccountDropdown() {
  const { accessToken: token, role } = useSelector(selectCurrentAuth)
  const { data } = useGetMeQuery(undefined, { skip: !token })
  const user = data?.data
  const { activeModalRef, rect, open, setOpen } = useModal()
  const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const handleClickLogout = async () => {
    await logout().unwrap()
    dispatch(logOut())
    navigate(path.login)
  }
  let avatar = user?.Avatar ? user?.Avatar : user?.Gender === 0 ? manAvatar : womanAvatar
  return (
    <>
      <div className='layout__function--user' ref={activeModalRef}>
        {!token ? null : <img src={avatar} alt='Fitfood user avatar' />}
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
                {role === ROLES.ADMIN ? <Link to={path.admin}>Trang Admin </Link> : <></>}
                <Link to={path.accountInfo}>Thông tin cá nhân </Link>
                <Link to={path.changePassword}>Đổi mật khẩu </Link>
                <Link to={path.paymentHistory}>Lịch sử giao dịch</Link>
                <hr />
                <li onClick={handleClickLogout}>Đăng xuất</li>
              </ul>
            </DropdownBase>
          )}
        </>
      ) : (
        <Link to={path.login} state={{ from: location }}>
          <BoxShadowButton data-testid='button-login'>Đăng nhập</BoxShadowButton>
        </Link>
      )}
      {isLogoutLoading && <Loading size={3} full />}
    </>
  )
}
