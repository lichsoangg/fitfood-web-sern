
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import CalorieCaculatorPage from "./pages/CalorieCaculatorPage/CalorieCaculatorPage";
import MainLayout from "./layouts/MainLayout/MainLayout";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
function FitFoodApp() {
    return (
        <FitFoodAppRoutes />
    );
}

function FitFoodAppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="/caloriecaculator" element={<CalorieCaculatorPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

            </Route>
        </Routes>
    );
}

export default FitFoodApp;