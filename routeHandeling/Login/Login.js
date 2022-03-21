const getIp=require('../../helperFunctions/getIp')
const findUSer=require('../../helperFunctions/findUser')

const Login=async (req,res)=>{
    try {
    const body=req.body
    
    // ROUTE HITTED
    console.log('Login request from ',body.ip,'with body ',body)
    if(!body.email || !body.password || !body.ip){
        console.log('Required Data not recieved');
        return res.status(403).json({
            error:true,
            message:"Please fill form correctly."
        })
    }
    
    
    const userIp=getIp(req.socket.remoteAddress)
    
} catch (error) {
    console.log('Server Error',error)
    return res.status(500)
}
    
}

module.exports=Login