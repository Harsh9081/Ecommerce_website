import React, { useEffect } from 'react';
import {useParams,useNavigate} from 'react-router-dom';

const UpdateProduct =()=>{
    const [name,setName] = React.useState('');
    const [price,setPrice] = React.useState('');
    const [company,setCompany] = React.useState('');
    const [category,setCategoty] = React.useState('');
    const params = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
        getProductDetails();
    },[]);

    const getProductDetails= async ()=>{
        let result = await fetch(`http://localhost:5000/get-product/${params.id}`,/*{
            headers:{
                //authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        }*/);
        result = await result.json()
        setName(result.name);
        setPrice(result.price);
        setCategoty(result.category);
        setCompany(result.company);
    }
    const updateProduct =async()=>{
       console.warn(name,price,category,company);
       let result = await fetch(`http://localhost:5000/update-product/${params.id}`,{
        method:'put',
        body:JSON.stringify({name,price,category,company}),
        headers:{
            'Content-type':'application/json'
            //authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
       });
        result = await result.json();
       console.warn(result);
       navigate('/list')
    }
    return(
        <div className='product'>
            <h1>Update product</h1>
            <input type="text" placeholder='Enter Product Name' value={name} onChange={(e)=>{setName(e.target.value)}} className='inputBox'></input>
            <input type="text" placeholder='Enter Product Price' value={price} onChange={(e)=>{setPrice(e.target.value)}} className='inputBox'></input>
            <input type="text" placeholder='Enter Product Category' value={category} onChange={(e)=>{setCategoty(e.target.value)}} className='inputBox'></input>
            <input type="text" placeholder='Enter Product Company'value={company} onChange={(e)=>{setCompany(e.target.value)}} className='inputBox'></input>
            <button onClick={updateProduct} className='appButton'>Update  Product</button>
        </div>
    )
}

export default UpdateProduct;