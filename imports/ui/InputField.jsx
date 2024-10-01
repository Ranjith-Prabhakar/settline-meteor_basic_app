import React, { useState } from 'react'
import {Meteor} from 'meteor/meteor'
const InputField = () => {
  const [user,setUser]= useState('')

  const handleChange = (e)=>{
    setUser(e.target.value)
  }

  const handleSubmit = async()=>{
   if (user.trim()) {
    Meteor.call('addUser',user,(error,result)=>{
      if(error){
      console.error(error.message)
      }else{
        console.log("user added successfully")
      }
    })
    setUser(''); // Clear the input field after submitting
  }
  }
  
  return (
    <div>
      <h1>Add user</h1>
      <input type="text" value={user} onChange={handleChange}/>
      <button onClick={handleSubmit}>Add</button>
      </div>
  )
}

export default InputField