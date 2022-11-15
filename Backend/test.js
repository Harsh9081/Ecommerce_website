const express = require('express');
require('./db/config');
const User = require('./db/Users');
const app = express();
const cors = require('cors');
const Product = require('./db/Product');
const Jwt = require('jsonwebtoken');

const jwtkey ='e-comm';

app.use(express.json());
app.use(cors());

//Register User
app.post("/register",async(req,res)=>{
    let user = new User(req.body);
    let result = await user.save();
    if(result)
    {
        result = result.toObject();
        delete result.password;
        Jwt.sign({result},jwtkey,{expiresIn:"2h"},(err,token)=>{
            if (err)
            {
                res.send({result:"something went weong"});
            }
            else
            {
                res.send({result, auth:token});
            }
        })
    }
    else
    {
        res.send(false);
    }
})

//Login User
app.post("/login",async(req,res)=>{
    //console.log(req.body)
    if(req.body.password && req.body.email)
    {
        let user= await User.findOne(req.body).select("-password");
        if(user)
        {
            Jwt.sign({user},jwtkey,{expiresIn:"2h"},(err,token)=>{
                if (err)
                {
                    res.send({result:"something went weong"});
                }
                else
                { 
                    res.send({user, auth:token});
                }
            })
        }
        else
        {
            res.send(false);
        }
    }
    else
    {
        res.send(false);
    }
})

//Add Product
app.post("/add-product",verifytoken,async(req,res)=>{
    let product = new Product(req.body);
    let result = await product.save();
    if(result)
    {
        console.log("Data registered succsessfully")
        res.send(result);
    }
    else
    {
        res.send(false);
    }
})


//List product
app.get("/get-product",verifytoken,async(req,res)=>{
    const products = await Product.find()
    if(products.length>0)
    {
        res.send(products);
    }
    else
    {
        res.send({result:"Products not found"});
    }
})

//Delete product
app.delete("/del-product/:_id",verifytoken,async(req,res)=>{
    //res.send(req.params);
    const result = await Product.deleteOne({_id:req.params._id});
    res.send(result)
})

//find single product api

app.get("/get-product/:id",verifytoken,async(req,res)=>{
    const result = await Product.findOne({_id:req.params.id});
    if(result)
        res.send(result);
    else
        res.send({result:"no record found"});
})

app.put("/update-product/:id",verifytoken,async(req,res)=>{
    console.log(req.params)
    const result = await Product.updateOne(
        {_id:req.params.id},
        {
            $set:req.body
        }
    )
    res.send(result);
});

app.get("/search/:key",verifytoken,async(req,res)=>{
    let result = await Product.find({
        "$or":[
            {name:{$regex:req.params.key}},
            {company:{$regex:req.params.key}},
            {category:{$regex:req.params.key}}
        ]
    });
    res.send(result)
})

// app.get("/profile",async(res,req)=>{
//     let result = 
// })

// app.get('/changepass',async(req,res)=>{
//     let result = user.findOne(req.body.password);
// })

function verifytoken(req,res,next){
    let token = req.headers['authorization'];
    if(token)
    {
        token = token.split(' ')[1];
        Jwt.verify(token,jwtkey,(err,valid)=>{
            if(err){
                res.status(401).send({result:"please provide valid token with header"})
            }else{
                next();
            }
        })
    }
    else{
        res.status(403).send({result:"please add token with header"})
    }
}

app.listen(5000);