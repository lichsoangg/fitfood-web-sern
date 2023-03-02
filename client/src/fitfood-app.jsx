import { Route, Routes } from 'react-router-dom'
import ErrorBoundaryComponent from './components/ErrorComponent/ErrorComponent'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import path from './constants/path'
import MainLayout from './layouts/MainLayout'
import AccountInformation from './pages/Account/AccountInformation'
import ChangePassword from './pages/Account/ChangePassword'
import ForgotPassword from './pages/ForgotPassword'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Register from './pages/Register'
import Unauthorized from './pages/Unauthorized'

//admin page
import Admin from './pages/Admin'
import EmployeeManagement from './pages/Admin/pages/EmployeeManagement'
import ProductManagement from './pages/Admin/pages/ProductManagement'
import FaqsPage from './pages/FaqsPage'
import TypeProductManagement from './pages/Admin/pages/TypeProductManagement/TypeProductManagement'
import BillManagement from './pages/BillManagement'
import ReportRevenue from './pages/ReportRevenue/ReportRevenue'
import Backup from './pages/Backup/Backup'
import { ROLES } from './constants/utils'
import ProductList from './pages/ProductList/ProuductList'
function FitFoodApp() {
  return (
    <ErrorBoundaryComponent>
      <FitFoodAppRoutes />
    </ErrorBoundaryComponent>
  )
}

function FitFoodAppRoutes() {
  return (
    <Routes>
      {/* main layout */}
      <Route path={path.home} element={<MainLayout />}>
        {/* public route */}
        <Route index element={<HomePage />} />
        <Route path={path.menu} element={<ProductList />} />
        <Route path={path.faqs} element={<FaqsPage />} />
        <Route path={path.login} element={<Login />} />
        <Route path={path.register} element={<Register />} />
        <Route path={path.forgotPassword} element={<ForgotPassword />} />

        {/* private route */}
        <Route element={<PrivateRoute />}>
          <Route path={path.changePassword} element={<ChangePassword />} />
          <Route path={path.accountInfo} element={<AccountInformation />} />
          <Route path={path.unauthorized} element={<Unauthorized />} />
        </Route>
      </Route>
      {/* private route admin layout*/}
      <Route element={<PrivateRoute requiredRole={[ROLES.ADMIN]} />}>
        <Route path={path.admin} element={<Admin />}>
          <Route index element={<EmployeeManagement />} />
          <Route path={path.productManagement} element={<ProductManagement />} />
          <Route path={path.productTypeManagement} element={<TypeProductManagement />} />
          <Route path={path.billManagement} element={<BillManagement />} />
          <Route path={path.revenueReport} element={<ReportRevenue />} />
          <Route path={path.backup} element={<Backup />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default FitFoodApp
