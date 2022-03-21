require('dotenv').config({path:'../.env'})
const jwt=require('jsonwebtoken');
const fs=require('fs')
const secretKey=fs.readFileSync(__dirname+'/../jwtRS256.key')

const tokenMaker=(data)=>{
    return jwt.sign(data,secretKey,{expiresIn:60*60})
}

const tokenChecker=(token)=>{
    return (jwt.verify(token,secretKey) ? true : false)
}

module.exports={tokenMaker,tokenChecker}
