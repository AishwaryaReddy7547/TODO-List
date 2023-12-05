
const express=require('express');
const route=require('./routes/route.js');
const bodyParser=require('body-parser');
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const cors=require('cors');

//initialize express
const app=express();

//configure bodyparser
app.use(bodyParser.json());

//congfig dotenv
dotenv.config();

//initialize cors
app.use(cors());

const port=process.env.PORT||5000;

//connect database
mongoose.connect(process.env.ToDoList_db)
.then((e)=>{
    console.log("connected to database");
})
.catch((e)=>{
    console.log("not connected");
})

//use route
app.use('/',route);

app.listen(port,()=>{
    console.log("printed");
})
