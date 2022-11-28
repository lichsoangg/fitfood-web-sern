import { Route, Routes } from 'react-router-dom';
import ErrorBoundaryComponent from './components/ErrorComponent/ErrorComponent';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import path from './constants/path';
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
      <Route path={path.home} element={<MainLayout />}>
        {/* public route */}
        <Route index element={<HomePage />} />
        <Route path={path.calorieCaculator} element={<CalorieCaculatorPage />} />
        <Route path={path.menu} element={<CalorieCaculatorPage />} />
        <Route path={path.faqs} element={<CalorieCaculatorPage />} />
        <Route path={path.about} element={<CalorieCaculatorPage />} />
        <Route path={path.login} element={<Login />} />
        <Route path={path.register} element={<Register />} />
        <Route path={path.forgotPassword} element={<ForgotPassword />} />

        {/* private route */}
        <Route element={<PrivateRoute />}>
          <Route path={path.changePassword} element={<ChangePassword />} />
          <Route path={path.accountInfo} element={<AccountInformation />} />
          <Route path={path.unauthorized} element={<Unauthorized />} />
        </Route>
        <Route element={<PrivateRoute requiredRole={['Admin']} />}>
          <Route path={path.admin} element={<Admin />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default FitFoodApp;
