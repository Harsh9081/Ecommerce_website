const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/e-commerce',(err)=>{
    if(!err)
    {
        console.log('Conected Succsessfully');
    }
    else
    {
        console.log('Connection Error');
    }
})