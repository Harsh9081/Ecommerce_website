import React from "react";
import { useState } from "react";
const Changepass =()=>{

    const [oldpass,setoldpass] = useState('');
    const [newpass,setnewpass] = useState('');
    const [newpass2,setnewpass2]=useState('');

    const changepass = async ()=>{
        const auth = localStorage.getItem('user');
        let email=await auth.email;
        //console.warn(auth);
        let result = await fetch('http://localhost:5000/changepass',{
            method:'post',
            body:JSON.stringify({oldpass,newpass,newpass2,email}),
            headers:{
                'Content-Type':'application/json'
            }
        })
    }

    return(
        <div className="changepass">
            <h1>Change Password</h1>
            <input type="text" placeholder='Enter Old password' value={oldpass} onChange={(e)=>{setoldpass(e.target.value)}} className='inputBox'></input>
            <input type="text" placeholder='Enter New password' value={newpass} onChange={(e)=>{setnewpass(e.target.value)}} className='inputBox'></input>
            <input type="text" placeholder='Re Enter New password' value={newpass2} onChange={(e)=>{setnewpass2(e.target.value)}} className='inputBox'></input>
            <button onClick={changepass} className='appButton'>change password</button>
        </div>
    )
}

export default Changepass;