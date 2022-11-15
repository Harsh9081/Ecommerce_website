import React from 'react';
import {Link} from 'react-router-dom';

const auth = localStorage.getItem("user");

const Profile=()=>{
    return(
        <div className='profile'>
            <h1>Profile</h1>
            <table className='pr-table'>
                <tr>
                    <td>Name:</td>
                    <td>{JSON.parse(auth).name}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>{JSON.parse(auth).email}</td>
                </tr>
                <tr><Link to={"/changepass"}>Change Password</Link></tr>
            </table>
        </div>
    )
}

export default Profile;