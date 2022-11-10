import React from 'react';
import { useNavigate } from 'react-router-dom';
export default function HomePage() {
   
    const navigate=useNavigate();
    const handleClickGoPage =()=>{
        navigate("/login")
    }
    return (
        <div>
            <h2>homepage</h2>
            <button onClick={handleClickGoPage}>Go Another Page</button>
        </div>
    );
}
