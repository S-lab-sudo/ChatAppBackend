const newUserModel = require("../mongooseModel/newUserModel")

const newUserSaver=(data)=>{    
    const saver=new newUserModel(data)
    return saver.save().then((response)=>response).catch(()=>false)
}
module.exports=newUserSaver