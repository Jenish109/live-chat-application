import React, { useState } from 'react'
import './join.css'
import logo from '../../images/chat.png';
import {Link} from 'react-router-dom'
let user;
const join = () => {

    const sendUser =()=>{
        user = document.getElementById('joinInput').value;
        document.getElementById('joinInput').value="";
    }
    const[name, setName] = useState("");

  return (

    <div className='joinPage'>
        <div className="joinContainer">
            <img src={logo} alt="" />
            <h1>JenChat</h1>
            <input onChange={(e)=>setName(e.target.value)} type="text" id='joinInput' placeholder='Enter your name'/>
            <Link onClick={(event)=> !name?event.preventDefault():null} to="/chat">
            
            <button onClick ={sendUser} className='joinBtn'>Login</button>
            </Link>
        </div>
    </div>
  )
}

export default join;
export {user}