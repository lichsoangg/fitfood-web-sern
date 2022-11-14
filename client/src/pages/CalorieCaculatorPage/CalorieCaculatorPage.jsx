import React from 'react';
import { useNavigate } from 'react-router-dom';
export default function CalorieCaculatorPage() {
    const navigate=useNavigate();
    const handleClickToHomePage=()=>{
        navigate("/");
    }
    return (
        <div onClick={handleClickToHomePage}>CalorieCaculatorPage</div>
    );
}
