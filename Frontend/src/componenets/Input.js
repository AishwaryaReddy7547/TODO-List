import React, { useState} from 'react';
import "./input.css"
import axios from 'axios';

function Input() {
  const [item, setItem] = useState('');
  const [itemsList, setItemsList] = useState([]);

  React.useEffect(()=>{axios.get('http://localhost:5000/item')
  .then((response) => {
    setItemsList(response.data);
  })
  .catch((error) => {
    console.log(error); 
  });},[])

  const handleInputChange = (event) => {
    setItem(event.target.value);
  };

  const handleSubmit = (event) => {

    axios.post('http://localhost:5000/additem', { item:item})
     .then((response) => {
       console.log(response.data); 
        setItem('');
       // setItemsList(item);
        setItemsList(prev=>{
          prev.push({item:item});
        })
        axios.get('http://localhost:5000/item');
      })
      .catch((error) => {
      console.log(error); 
      });
  };

  function UpdateItem(item1) {
    axios
      .put(`http://localhost:5000/updateitem/${item1._id}`, { item: item1.item })
      .then((res) => {
       console.log(res.data);
       setItemsList(res.data);
       axios.get('http://localhost:5000/item');
       // .then((res)=>res.data))
      })
      .catch((e) => {
      console.log(e);
     });
  }
  
  function updateElement(item1) {
    var x = document.createElement("input");
    x.setAttribute("type", "text");
    x.setAttribute("id", "inputtype");
    x.setAttribute("placeholder", "update element");
    x.className = "updated-input";
    document.getElementById(`para-${item1._id}`).appendChild(x);
  
    var y = document.createElement("input");
    y.setAttribute("type", "button");
    y.setAttribute("value", "Update");
    y.className = "updated-input1";
    y.addEventListener("click", function () {
      var updatedItem = document.getElementById("inputtype").value;
      item1.item = updatedItem; 
      UpdateItem(item1);
      setItem(updatedItem);
      document.getElementById(`para-${item1._id}`).removeChild(x);
      document.getElementById(`para-${item1._id}`).removeChild(y);
    });
    document.getElementById(`para-${item1._id}`).appendChild(y);
}

  
  function DeleteItem(item1){
    axios.delete(`http://localhost:5000/deleteitem/${item1._id}`)
    .then((res)=>{
      console.log(res.data);
      setItemsList(res.data);
      //.then((res)=>res.data))
    })
    .catch((e)=>{
      console.log(e);
    })
  }

  return (
    <div align="center">
      <div style={{width:"800px", height:"150px",backgroundColor:"#54AFBC",borderRadius:"10px"}}>
      <br /><br />
      <form onSubmit={handleSubmit}>
        <label htmlFor="item" style={{fontSize:"25px"}}><b>Enter the Item:</b></label>&nbsp;&nbsp;
        <input style={{height:"25px"}}
          type="text"
          id="item"
          placeholder="add items..."
          value={item}
          onChange={handleInputChange}
        />
        <br /><br />
        <button className="button3" type="submit" style={{width:"100px",height:"28px"}}>Enter</button>
      </form>
       </div>
        {itemsList.map((item1) => (
          <div>
          <br />
          <div style={{backgroundColor:"lavender",width:"800px",height:"80px",display:"flex",justifyContent:"space-around"}}>
          <h3 >{item1.item}</h3>
          <p id={`para-${item1._id}`}></p>
          <button className="button1" style={{height:"30px",width:"80px",marginTop:"25px",backgroundColor:"grey"}} onClick={()=>DeleteItem(item1)} >Delete</button>
          <button className="button2" style={{height:"30px",width:"80px",marginTop:"25px",backgroundColor:"grey"}} onClick={()=>updateElement(item1)}>Update</button>
          </div>
          <br />
          </div>
        ))}
    </div>
  );
}

export default Input;
