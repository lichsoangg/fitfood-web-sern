import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import CalorieCaculatorPage from './pages/CalorieCaculatorPage/CalorieCaculatorPage';
import MainLayout from './layouts/MainLayout/MainLayout';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ErrorBoundaryComponent from './components/ErrorComponent/ErrorComponent';
import ChangePassword from './pages/Account/ChangePassword/ChangePassword';
import AccountInformation from './pages/Account/AccountInformation/AccountInformation';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Admin from './pages/Admin/Admin';
import Unauthorized from './pages/Unauthorized/Unauthorized';
import ActivePage from './pages/ActivePage/ActivePage';
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
