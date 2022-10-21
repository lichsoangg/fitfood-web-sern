
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import CalorieCaculatorPage from "./pages/CalorieCaculatorPage/CalorieCaculatorPage";
function FitFoodApp() {
    return (
        <FitFoodAppRoutes />
    );
}

function FitFoodAppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/caloriecaculator" element={<CalorieCaculatorPage />} />
        </Routes>
    );
}

export default FitFoodApp;