import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import fitfoodImage from '../../assets/images/logo_fitfood.png'
import Navbar from '../../components/Navbar'
import path from '../../constants/path'
import './Admin.scss'
<<<<<<< HEAD

=======
import Header from '../../layouts/MainLayout/Header/Header'
<<<<<<< HEAD
>>>>>>> a6f7cca (merge page-homepage)
=======
import Help from '../../components/Help/Help'
>>>>>>> 9b1aead (chore: provide data for database)
const homeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.29367 4.96556C3.62685 6.90311 2.29344 7.87189 1.76974 9.30291C1.72773 9.41771 1.68994 9.534 1.65645 9.65157C1.23901 11.1171 1.74832 12.6846 2.76696 15.8197C3.78559 18.9547 4.2949 20.5222 5.49405 21.4625C5.59025 21.5379 5.68918 21.6098 5.79064 21.678C6.21729 21.9647 6.68756 22.1546 7.25 22.2805V17.8197C7.25 15.1963 9.37665 13.0697 12 13.0697C14.6234 13.0697 16.75 15.1963 16.75 17.8197V22.2805C17.3124 22.1546 17.7827 21.9647 18.2094 21.678C18.3108 21.6098 18.4098 21.5379 18.506 21.4625C19.7051 20.5222 20.2144 18.9547 21.2331 15.8197C22.2517 12.6846 22.761 11.1171 22.3436 9.65157C22.3101 9.534 22.2723 9.41771 22.2303 9.30291C21.7066 7.87189 20.3732 6.90312 17.7064 4.96557C15.0395 3.02801 13.7061 2.05923 12.1833 2.00336C12.0611 1.99888 11.9389 1.99888 11.8167 2.00336C10.2939 2.05923 8.96048 3.02801 6.29367 4.96556Z" fill="white" />
    <path fillRule="evenodd" clipRule="evenodd" d="M15.25 22.4732V17.8197C15.25 16.0247 13.7949 14.5697 12 14.5697C10.2051 14.5697 8.75 16.0247 8.75 17.8197V22.4732C9.62296 22.5279 10.6792 22.5279 12 22.5279C13.3208 22.5279 14.377 22.5279 15.25 22.4732ZM12.75 17.8197C12.75 17.4054 12.4142 17.0697 12 17.0697C11.5858 17.0697 11.25 17.4054 11.25 17.8197V19.8197C11.25 20.2339 11.5858 20.5697 12 20.5697C12.4142 20.5697 12.75 20.2339 12.75 19.8197V17.8197Z" fill="white" />
  </svg>

)

const employeesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C9.37665 2 7.25 4.12665 7.25 6.75C7.25 9.37335 9.37665 11.5 12 11.5C14.6234 11.5 16.75 9.37335 16.75 6.75C16.75 4.12665 14.6234 2 12 2Z" fill="white" />
    <path d="M9 13C6.37665 13 4.25 15.1266 4.25 17.75C4.25 20.3734 6.37665 22.5 9 22.5H15C17.6234 22.5 19.75 20.3734 19.75 17.75C19.75 15.1266 17.6234 13 15 13H9Z" fill="white" />
  </svg>

)

const productsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.92 2.25997L19.43 5.76997C20.19 6.17997 20.19 7.34997 19.43 7.75997L12.92 11.27C12.34 11.58 11.66 11.58 11.08 11.27L4.57 7.75997C3.81 7.34997 3.81 6.17997 4.57 5.76997L11.08 2.25997C11.66 1.94997 12.34 1.94997 12.92 2.25997Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3.61 10.13L9.66 13.16C10.41 13.54 10.89 14.31 10.89 15.15V20.8701C10.89 21.7001 10.02 22.2301 9.28 21.8601L3.23 18.83C2.48 18.45 2 17.68 2 16.84V11.12C2 10.29 2.87 9.76005 3.61 10.13Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20.3899 10.13L14.3399 13.16C13.5899 13.54 13.1099 14.31 13.1099 15.15V20.8701C13.1099 21.7001 13.9799 22.2301 14.7199 21.8601L20.7699 18.83C21.5199 18.45 21.9999 17.68 21.9999 16.84V11.12C21.9999 10.29 21.1299 9.76005 20.3899 10.13Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>


)
const typeProductIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 8.52V3.98C22 2.57 21.36 2 19.77 2H15.73C14.14 2 13.5 2.57 13.5 3.98V8.51C13.5 9.93 14.14 10.49 15.73 10.49H19.77C21.36 10.5 22 9.93 22 8.52Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M22 19.77V15.73C22 14.14 21.36 13.5 19.77 13.5H15.73C14.14 13.5 13.5 14.14 13.5 15.73V19.77C13.5 21.36 14.14 22 15.73 22H19.77C21.36 22 22 21.36 22 19.77Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.5 8.52V3.98C10.5 2.57 9.86 2 8.27 2H4.23C2.64 2 2 2.57 2 3.98V8.51C2 9.93 2.64 10.49 4.23 10.49H8.27C9.86 10.5 10.5 9.93 10.5 8.52Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.5 19.77V15.73C10.5 14.14 9.86 13.5 8.27 13.5H4.23C2.64 13.5 2 14.14 2 15.73V19.77C2 21.36 2.64 22 4.23 22H8.27C9.86 22 10.5 21.36 10.5 19.77Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const reportIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.67 14H4C2.9 14 2 14.9 2 16V22H8.67V14Z" stroke="white" strokeWidth="1.5" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13.3302 10H10.6602C9.56016 10 8.66016 10.9 8.66016 12V22H15.3302V12C15.3302 10.9 14.4402 10 13.3302 10Z" stroke="white" strokeWidth="1.5" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20.0001 17H15.3301V22H22.0001V19C22.0001 17.9 21.1001 17 20.0001 17Z" stroke="white" strokeWidth="1.5" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12.5202 2.07007L13.0502 3.13006C13.1202 3.28006 13.3102 3.42006 13.4702 3.44006L14.4302 3.60007C15.0402 3.70007 15.1902 4.15005 14.7502 4.58005L14.0002 5.33005C13.8702 5.46005 13.8002 5.70006 13.8402 5.87006L14.0502 6.79007C14.2202 7.52007 13.8302 7.80007 13.1902 7.42007L12.2902 6.89007C12.1302 6.79007 11.8602 6.79007 11.7002 6.89007L10.8002 7.42007C10.1602 7.80007 9.77023 7.52007 9.94023 6.79007L10.1502 5.87006C10.1902 5.70006 10.1202 5.45005 9.99023 5.33005L9.25023 4.59006C8.81023 4.15006 8.95023 3.71005 9.57023 3.61005L10.5302 3.45007C10.6902 3.42007 10.8802 3.28007 10.9502 3.14007L11.4802 2.08005C11.7702 1.50005 12.2302 1.50007 12.5202 2.07007Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>

)

const providerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 15C22 18.87 18.87 22 15 22L16.05 20.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 9C2 5.13 5.13 2 9 2L7.95 3.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13.7002 4.44995L17.6802 6.74994L21.6202 4.45996" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17.6802 10.82V6.73999" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16.7401 2.21L14.3401 3.53996C13.8001 3.83996 13.3501 4.59995 13.3501 5.21995V7.75999C13.3501 8.37999 13.7901 9.13998 14.3401 9.43998L16.7401 10.77C17.2501 11.06 18.0901 11.06 18.6101 10.77L21.0101 9.43998C21.5501 9.13998 22.0001 8.37999 22.0001 7.75999V5.21995C22.0001 4.59995 21.5601 3.83996 21.0101 3.53996L18.6101 2.21C18.1001 1.93 17.2601 1.93 16.7401 2.21Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2.3501 15.45L6.3201 17.7499L10.2701 15.46" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.32007 21.82V17.74" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5.39 13.21L2.99001 14.54C2.45001 14.84 2 15.5999 2 16.2199V18.76C2 19.38 2.44001 20.14 2.99001 20.44L5.39 21.77C5.9 22.06 6.73999 22.06 7.25999 21.77L9.66 20.44C10.2 20.14 10.65 19.38 10.65 18.76V16.2199C10.65 15.5999 10.21 14.84 9.66 14.54L7.25999 13.21C6.73999 12.93 5.9 12.93 5.39 13.21Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const billIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 6V8.42C22 10 21 11 19.42 11H16V4.01C16 2.9 16.91 2 18.02 2C19.11 2.01 20.11 2.45 20.83 3.17C21.55 3.9 22 4.9 22 6Z" stroke="white" strokeWidth="1.5" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 7V21C2 21.83 2.94 22.3 3.6 21.8L5.31 20.52C5.71 20.22 6.27 20.26 6.63 20.62L8.29 22.29C8.68 22.68 9.32 22.68 9.71 22.29L11.39 20.61C11.74 20.26 12.3 20.22 12.69 20.52L14.4 21.8C15.06 22.29 16 21.82 16 21V4C16 2.9 16.9 2 18 2H7H6C3 2 2 3.79 2 6V7Z" stroke="white" strokeWidth="1.5" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 13.01H12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 9.00999H12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5.99561 13H6.00459" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5.99561 9H6.00459" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>

)

const deliveryNoteIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.5 11.3V7.04001C20.5 3.01001 19.56 2 15.78 2H8.22C4.44 2 3.5 3.01001 3.5 7.04001V18.3C3.5 20.96 4.96001 21.59 6.73001 19.69L6.73999 19.68C7.55999 18.81 8.80999 18.88 9.51999 19.83L10.53 21.18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 7H16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 11H15" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18.211 14.7703L14.671 18.3103C14.531 18.4503 14.401 18.7103 14.371 18.9003L14.181 20.2503C14.111 20.7403 14.451 21.0803 14.941 21.0103L16.291 20.8203C16.481 20.7903 16.751 20.6603 16.881 20.5203L20.421 16.9803C21.031 16.3703 21.321 15.6603 20.421 14.7603C19.531 13.8703 18.821 14.1603 18.211 14.7703Z" stroke="white" strokeWidth="1.5" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17.6992 15.2803C17.9992 16.3603 18.8392 17.2003 19.9192 17.5003" stroke="white" strokeWidth="1.5" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const backupIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.58 19.7C13.47 19.85 13.47 22.91 15.58 23.06H20.59C21.2 23.06 21.78 22.84 22.23 22.43C23.71 21.14 22.92 18.54 20.97 18.3C20.27 14.08 14.16 15.68 15.61 19.7" fill="white" />
    <path d="M15.58 19.7C13.47 19.85 13.47 22.91 15.58 23.06H20.59C21.2 23.06 21.78 22.84 22.23 22.43C23.71 21.14 22.92 18.54 20.97 18.3C20.27 14.08 14.16 15.68 15.61 19.7" fill="white" />
    <path d="M22 11.07V15.34C22 15.66 21.49 15.8 21.27 15.57C20.8 15.08 20.21 14.71 19.53 14.5C17.96 14.01 16.15 14.49 15.01 15.67C14.29 16.44 13.9 17.4 13.88 18.44C13.88 18.62 13.79 18.78 13.65 18.89C12.93 19.46 12.49 20.35 12.49 21.37V21.38C12.49 21.7 12.26 21.99 11.94 21.99H7.34C4.4 22 2 19.6 2 16.65V6.42C2 3.98 3.98 2 6.42 2H8.74C10.37 2 10.88 2.53 11.53 3.4L12.93 5.26C13.24 5.67 13.28 5.72 13.86 5.72H16.65C19.03 5.72 21.05 7.28 21.74 9.44C21.89 9.89 21.97 10.35 21.99 10.84C22 10.91 22 11 22 11.07Z" fill="white" />
  </svg>
)




export default function Admin() {
  const [toggle, setToggle] = useState(false)

  return (
<<<<<<< HEAD
    <div className='admin'>
      <div className='admin__navbar' style={{ width: `${toggle ? '20%' : '5%'}` }}>
        <Navbar toggle={toggle} setToggle={setToggle}>
          <Navbar.Toggle />
          <Navbar.Item image={fitfoodImage} title='Fitfood Admin Page' />
          <Navbar.Border />
          <Navbar.Item Svg={homeIcon} title='Trở về trang chủ' navigate={path.home} />
          <Navbar.Border />
          <Navbar.List>
            <Navbar.Item Svg={employeesIcon} title='Quản lý nhân viên' navigate={path.admin} end />
            <Navbar.Item Svg={productsIcon} title='Quản lý hàng hoá' navigate={path.productManagement} />
            <Navbar.Item Svg={productsIcon} title='Quản lý hàng hoá' navigate={path.productManagement} />
            <Navbar.Item Svg={productsIcon} title='Quản lý hàng hoá' navigate={path.productManagement} />
          </Navbar.List>
        </Navbar>
      </div>
      <div className='admin__outlet' style={{ width: `${toggle ? '80%' : '95%'}` }}>
        <Outlet />
=======
    <>
      <Header />
      <div className='admin'>
        <div className='admin__navbar' style={{ width: `${toggle ? '20%' : '5%'}` }}>
          <Navbar toggle={toggle} setToggle={setToggle}>
            <Navbar.Toggle />
            {/* <Navbar.Item image={fitfoodImage} title='Fitfood Admin Page' /> */}
            {/* <Navbar.Border /> */}
            <Navbar.Item Svg={homeIcon} title='Trở về trang chủ' navigate={path.home} />
            <Navbar.Border />
            <Navbar.List>
              <Navbar.Item Svg={employeesIcon} title='Quản lý nhân viên' navigate={path.admin} end />
              <Navbar.Item Svg={typeProductIcon} title='Quản lý loại sản phẩm' navigate={path.productTypeManagement} />
              <Navbar.Item Svg={productsIcon} title='Quản lý sản phẩm' navigate={path.productManagement} />
              <Navbar.Item Svg={billIcon} title='Quản lý đơn đặt dàng' navigate={path.billManagement} />
              <Navbar.Item Svg={providerIcon} title='Quản lý nhà cung cấp' navigate={path.productManagement} />
              <Navbar.Item Svg={deliveryNoteIcon} title='Quản lý nhập hàng' navigate={path.productManagement} />
              <Navbar.Item Svg={reportIcon} title='Báo cáo doanh thu' navigate={path.revenueReport} />
              <Navbar.Item Svg={backupIcon} title='Sao lưu phục hồi' navigate={path.backup} />
            </Navbar.List>
          </Navbar>
        </div>
        <div className='admin__outlet' style={{ width: `${toggle ? '80%' : '95%'}` }}>
          <Outlet />
          <Help position={{ right: '10px', top: '80px' }} />
        </div>
>>>>>>> cc325c0 (fix some bugs)
      </div>
    </div>
  )
}
