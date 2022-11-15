import React from 'react';
const Addproduct =()=>{
    const [name,setName] = React.useState('');
    const [price,setPrice] = React.useState('');
    const [company,setCompany] = React.useState('');
    const [category,setCategoty] = React.useState('');
    const userId =JSON.parse(localStorage.getItem('user'))._id;
    const [error,setError]=React.useState(false);
    const addProduct =async()=>{
        if(!name || !price || !category || !company)
        {
            setError(true);
            return false;
        }
        console.warn(name,price,company,category);
        let result = await fetch('http://localhost:5000/add-product',{
            method:'post',
            body:JSON.stringify({name,price,category,userId,company}),
            headers:{
                'Content-Type':'application/json',
                //authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if(result)
        {
            alert("Data Entered succsessfully");
        }
        else
        {
            alert("Error occured");
        }
    }
    return(
        <div className='product'>
            <h1>Add product</h1>
            <input type="text" placeholder='Enter Product Name' value={name} onChange={(e)=>{setName(e.target.value)}} className='inputBox'></input>
            {error && !name &&<span span className='errormsg'>Enter valid Name</span>}
            <input type="text" placeholder='Enter Product Price' value={price} onChange={(e)=>{setPrice(e.target.value)}} className='inputBox'></input>
            {error && !price &&<span span className='errormsg'>Enter valid Price</span>}
            <input type="text" placeholder='Enter Product Category' value={category} onChange={(e)=>{setCategoty(e.target.value)}} className='inputBox'></input>
            {error && !category &&<span span className='errormsg'>Enter valid Category</span>}
            <input type="text" placeholder='Enter Product Company'value={company} onChange={(e)=>{setCompany(e.target.value)}} className='inputBox'></input>
            {error && !company &&<span span className='errormsg'>Enter valid Company</span>}
            <button onClick={addProduct} className='appButton'>Add  Product</button>
        </div>
    )
}

export default Addproduct;