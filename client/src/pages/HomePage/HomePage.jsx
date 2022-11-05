import React from 'react';
import { useGetUsersQuery } from './userApi';
// import {store} from "../../app/store.js";
import { useNavigate } from 'react-router-dom';
export default function HomePage() {
    const {data}=useGetUsersQuery();
    const navigate=useNavigate();
    console.log("🚀 ~ data,error", data)
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
