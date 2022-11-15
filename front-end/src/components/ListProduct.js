import React from 'react';
import { useEffect,useState } from 'react';
import {Link} from "react-router-dom";

const Listproduct=()=>{
    const [products,setProducts]= useState([]);
    
    useEffect(()=>{
        getProducts();
    },[]);
    //call list product api
    const getProducts =async()=>{
        let result = await fetch('http://localhost:5000/get-product',{
            headers:{
                //authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setProducts(result);
    }

    const deleteproduct =async(id)=>{
        let result = await fetch(`http://localhost:5000/del-product/${id}`,{
            method:"Delete"
            /*headers:{
                //authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }*/
        })
        result = await result.json();
        if(result)
        {
            alert("reccord deleted");
            getProducts();
        }
        else
        {
            alert("error");
        }
    }
    const searchHandle = async(event)=>{
        // console.warn(event.target.value)
        let key = event.target.value;
        if(key)
        {
            console.warn(key);
            let result = await fetch(`http://localhost:5000/search/${key}`/*,{
                // headers:{
                //     //authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                // }
            }*/)
            result = await result.json();
            if(result)
            {
                console.log(result)
                setProducts(result)
            }
        }
        else
        {
            getProducts();
        }
    }
    return(
        <div className='product-list'>
            <h3>Product list</h3>
            <input type="text" placeholder="Search Product" className='search' onChange={searchHandle}></input>
            <ul>
                <li>S. No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>
            {
                products.length>0 ? products.map((item,index)=>
                <ul key={item._id}>
                <li>{index+1}</li>
                <li>{item.name}</li>
                <li>{item.price}</li>
                <li>{item.category}</li>
                <li>{item.company}</li>
                <li>
                    <button onClick={()=>deleteproduct(item._id)}>Delete</button>
                    <Link to={"/update/"+item._id}>Update</Link>
                </li>
                </ul>
                )
                :<h1> No Result Found</h1>
            }
        </div>
    )
}

export default Listproduct;