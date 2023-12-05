const express=require('express');
const router=express.Router();
const itemModel=require('../models/itemModel');

router.get('/item',(req,res)=>{
     itemModel.find()
     .then((users)=>{
        res.json(users);
     })
     .catch((e)=>{
        console.log("error in getting the data");
     })
});

router.post('/additem',(req,res)=>{
    const item=req.body.item;
    new itemModel({
        item:item
    }).save().then((e)=>{
        console.log("added item")
    }).catch((e)=>{
        console.log("error in posting the data");
    })
});


router.put('/updateitem/:id',(req,res)=>{
    const item=req.body.item;
    const id=req.params.id;
    const user=itemModel.findByIdAndUpdate(id,{item:item},{new:true})
    .then(e=>{
      console.log("updated item");
    })
    .catch(e=>{
        console.log("error in updating");
    })
});

router.delete('/deleteitem/:id', (req,res)=>{
    //const item=req.body.item;
    const id=req.params.id;
    const user= itemModel.findByIdAndDelete(id)
    .then(e=>{
        console.log("Deleted record",e.message);
        
    })
    .catch(e=>{
        console.log("error in deleting",e.message);

    })
});

module.exports=router;