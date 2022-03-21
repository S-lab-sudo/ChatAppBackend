const tokenModel=require('../mongooseModel/tokenModel')
const tokenSaver=(data)=>{
    let saver=new tokenModel(data)
    return saver.save().then(()=>true).catch(()=>false)
}
module.exports=tokenSaver