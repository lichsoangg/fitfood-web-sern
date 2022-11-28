import { Route, Routes } from 'react-router-dom';
import ErrorBoundaryComponent from './components/ErrorComponent/ErrorComponent';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import MainLayout from './layouts/MainLayout/MainLayout';
import AccountInformation from './pages/Account/AccountInformation/AccountInformation';
import ChangePassword from './pages/Account/ChangePassword/ChangePassword';
import Admin from './pages/Admin/Admin';
import CalorieCaculatorPage from './pages/CalorieCaculatorPage/CalorieCaculatorPage';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import HomePage from './pages/HomePage/HomePage';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Unauthorized from './pages/Unauthorized/Unauthorized';
function FitFoodApp() {
  return (
    <ErrorBoundaryComponent>
      <FitFoodAppRoutes />
    </ErrorBoundaryComponent>
  );
}

function FitFoodAppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        {/* public route */}
        <Route index element={<HomePage />} />
        <Route path='/tinh-calo' element={<CalorieCaculatorPage />} />
        <Route path='/thuc-don' element={<CalorieCaculatorPage />} />
        <Route path='/faqs' element={<CalorieCaculatorPage />} />
        <Route path='/ve-chung-toi' element={<CalorieCaculatorPage />} />
        <Route path='/dang-nhap' element={<Login />} />
        <Route path='/dang-ky' element={<Register />} />
        <Route path='/quen-mat-khau' element={<ForgotPassword />} />

        {/* private route */}
        <Route element={<PrivateRoute />}>
          <Route path='/doi-mat-khau' element={<ChangePassword />} />
          <Route path='/thong-tin-ca-nhan' element={<AccountInformation />} />
          <Route path='/unauthorized' element={<Unauthorized />} />
        </Route>
        <Route element={<PrivateRoute requiredRole={['Admin']} />}>
          <Route path='/admin' element={<Admin />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default FitFoodApp;
