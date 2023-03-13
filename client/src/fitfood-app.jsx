import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import ErrorBoundaryComponent from './components/ErrorComponent/ErrorComponent'
import Loading from './components/Loading/Loading'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import path from './constants/path'
import { ROLES } from './constants/utils'

const MainLayout = lazy(() => import('./layouts/MainLayout'))
const HomePage = lazy(() => import('./pages/HomePage'))
const FaqsPage = lazy(() => import('./pages/FaqsPage'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const AccountInformation = lazy(() => import('./pages/Account/AccountInformation'))
const ChangePassword = lazy(() => import('./pages/Account/ChangePassword'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const Unauthorized = lazy(() => import('./pages/Unauthorized'))
const ProductList = lazy(() => import('./pages/ProductList/ProductList'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Payment = lazy(() => import('./pages/Payment'))
const PaymentHistory = lazy(() => import('./pages/PaymentHistory'))
const Admin = lazy(() => import('./pages/Admin'))
const ProductManagement = lazy(() => import('./pages/Admin/pages/ProductManagement'))

//admin page

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
      <Route
        path={path.home}
        element={
          <Suspense fallback={<Loading full size={3}></Loading>}>
            <MainLayout />
          </Suspense>
        }
      >
        {/* public route */}
        <Route
          index
          element={
            <Suspense fallback={<Loading full size={3}></Loading>}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path={path.menu}
          element={
            <Suspense fallback={<Loading full size={3}></Loading>}>
              <ProductList />
            </Suspense>
          }
        />
        <Route
          path={path.faqs}
          element={
            <Suspense fallback={<Loading full size={3}></Loading>}>
              <FaqsPage />
            </Suspense>
          }
        />
        <Route
          path={path.login}
          element={
            <Suspense>
              <Login />
            </Suspense>
          }
        />
        <Route
          path={path.register}
          element={
            <Suspense fallback={<Loading full size={3}></Loading>}>
              <Register />
            </Suspense>
          }
        />
        <Route
          path={path.forgotPassword}
          element={
            <Suspense fallback={<Loading full size={3}></Loading>}>
              <ForgotPassword />
            </Suspense>
          }
        />
        <Route
          path={`${path.menu}${path.productDetail}`}
          element={
            <Suspense fallback={<Loading full size={3}></Loading>}>
              <ProductDetail />
            </Suspense>
          }
        />

        {/* private route */}
        <Route element={<PrivateRoute />}>
          <Route
            path={path.changePassword}
            element={
              <Suspense fallback={<Loading full size={3}></Loading>}>
                <ChangePassword />
              </Suspense>
            }
          />
          <Route
            path={path.accountInfo}
            element={
              <Suspense fallback={<Loading full size={3}></Loading>}>
                <AccountInformation />
              </Suspense>
            }
          />
          <Route
            path={path.unauthorized}
            element={
              <Suspense fallback={<Loading full size={3}></Loading>}>
                <Unauthorized />
              </Suspense>
            }
          />
          <Route
            path={path.payment}
            element={
              <Suspense fallback={<Loading full size={3}></Loading>}>
                <Payment />
              </Suspense>
            }
          />
          <Route
            path={path.paymentHistory}
            element={
              <Suspense fallback={<Loading full size={3}></Loading>}>
                <PaymentHistory />
              </Suspense>
            }
          />
        </Route>
      </Route>
      {/* private route admin layout*/}
      <Route element={<PrivateRoute requiredRole={[ROLES.ADMIN]} />}>
        <Route
          path={path.admin}
          element={
            <Suspense fallback={<Loading full size={3}></Loading>}>
              <Admin />
            </Suspense>
          }
        >
          <Route
            path={path.admin}
            element={
              <Suspense fallback={<Loading full size={3}></Loading>}>
                <ProductManagement />
              </Suspense>
            }
            index
          />
        </Route>
      </Route>
    </Routes>
  )
}

export default FitFoodApp
