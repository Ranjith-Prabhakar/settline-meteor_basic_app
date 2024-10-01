import React, { useEffect, useState } from 'react';
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { LinksCollection } from '../api/links';
import { Meteor } from 'meteor/meteor';

export const UserTable = () => {
  const isLoading = useSubscribe('users');
  const links = useFind(() => LinksCollection.find());


  // deleteEvent
  Meteor.subscribe('delete',(arg)=>arg())
  
  const [editableUserId, setEditableUserId] = useState(null); 

  useEffect(()=>console.log("links",links),[links])

  if (isLoading()) {
    return <div>Loading...</div>;
  }

  

  const handleDelete = async (id) => {
    Meteor.call('deleteUser', id, (error) => {
      if (error) console.error(error.message);
    });
  };

  const editUser = (id) => {
    setEditableUserId(id); // Set the editable user id
  };


  const handleInputBlur = (id) => {
    setEditableUserId(null); // Reset editable state when input loses focus
  };

  const updateUser = (key, id, data) => {
    if (key === 'Enter') {
      console.log("data",data)
    Meteor.call('updateUser', { id, data },(error,data)=>{
      if(!error){
        setEditableUserId(null);
      }
    })
    }
  }
  return (
    <div>
      <h2>Learn Meteor!</h2>
      <ul>
        {links.map(link => (
          <li key={link._id} style={{ marginBottom: '10px' }}>
            <input
              data-visible={link._id}
              disabled={editableUserId !== link._id} // Make input editable if it's the selected user
              defaultValue={link.userName} // Set the initial value of the input
              onBlur={() => handleInputBlur(link._id)} // Reset on blur
              onKeyDown={(e) => updateUser(e.key, link._id, e.target.value)}
            />
            <button style={{ marginLeft: '20px' }} onClick={() => handleDelete(link._id)}>delete</button>
            <button style={{ marginLeft: '20px' }} onClick={() => editUser(link._id)}>edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
