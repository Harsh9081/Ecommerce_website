import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup2 =()=>{
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPass]=useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem("user");
        if(auth)
        {
            navigate('/');
        }
    })
    const collectData= async ()=>{
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
        if(result.auth)
        {
            alert('Data Inserted succsesfully');
            navigate('/');
            localStorage.setItem("user",JSON.stringify(result.result));
            localStorage.setItem("token",JSON.stringify(result.auth))
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

export default Signup2;