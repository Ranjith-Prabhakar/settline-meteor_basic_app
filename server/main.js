
import { Meteor } from 'meteor/meteor';
import { LinksCollection } from '/imports/api/links';

Meteor.startup(async () => {
  Meteor.methods({
    addUser:async(userName)=>{
      await LinksCollection.insertAsync({ userName, createdAt: new Date() });
    },
    deleteUser:async(id)=>{
      await LinksCollection.removeAsync(id)
    },
    updateUser:async({id,data})=>{
      console.log("data",data)
      await LinksCollection.updateAsync({_id:id},{$set:{userName:data}})
    }
  })
   Meteor.publish("users", function () {
    console.log("resluttt")
    return LinksCollection.find();
  });
});
