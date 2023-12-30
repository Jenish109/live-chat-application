import React from 'react'
import './message.css'
const message = ({user,msg, classs}) => {
  if(user){
    return (
      <div className= {`msgBox ${classs}`} >
        {`${user} :  ${msg}`}
      </div>
    )
  }
  else{
    return (
      <div  className= {`msgBox ${classs}`}>{`You : ${msg}`}</div>
    )

  }
}

export default message