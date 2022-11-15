import React, { useState, useEffect } from "react";
import {useNavigate } from "react-router-dom";

const Login =()=>{
    const [email,setEmail]=useState("");
    const [password,setPass]=useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth)
        {
            navigate("/");
        }
    })
    const handleLogin= async()=>{
        console.warn(email,password)
        let result = await fetch('http://localhost:5000/login',{
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        result = await result.json();
        console.warn(result);
        if(result.auth){
            localStorage.setItem("user",JSON.stringify(result.user));
            localStorage.setItem("token",JSON.stringify(result.auth));
            navigate('/');
        }
        else
        {
            alert("please enter correct detail");
        }
    }
    return(
        <div className="register">
            <h1>Login</h1>
            <input type="email" value={email} placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)} className="inputBox"></input>
            <input type="password" value={password} onChange={(e)=>setPass(e.target.value)} placeholder="Enter Password" className="inputBox"></input>
            <button type="button" onClick={handleLogin} className="appButton">Login</button>
        </div>
    )
}

export default Login;