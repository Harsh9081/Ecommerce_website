import React from "react";
import {useNavigate} from "react-router-dom";
import { useState } from "react";

const SignUP = ()=>{
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPass]=useState("");
    const navigate = useNavigate();
    const collectData=async()=>{
        console.table(name,email,password);
        let result = await fetch('http://localhost:5000/register',{
            method:'post',
            body: JSON.stringify({name,email,password}),
            headers:{
                'Content-Type':'application/json'
            },
        });
        result = await result.json()
        console.warn(result);
        if(result)
        {
            navigate('/');
        }
    }
    return(
        <div className="register">
            <h1>Register</h1>
            <input type="text" value={name} placeholder="Enter Name" className="inputBox" onChange={(e)=>setName(e.target.value)}></input>
            <input type="email" value={email} placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)} className="inputBox"></input>
            <input type="password" value={password} onChange={(e)=>setPass(e.target.value)} placeholder="Enter Password" className="inputBox"></input>
            <button type="button" onClick={collectData} className="appButton">Sign up</button>
        </div>
    )
}

export default SignUP;