const newUserModel=require('../mongooseModel/newUserModel')

const findUser=(objectData)=>{
    return newUserModel.find(objectData).then(res=>res).catch(err=>false)
}

module.exports=findUser