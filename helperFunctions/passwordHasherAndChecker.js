const bcrypt=require('bcrypt')
const hasher=(password,salt)=>{
    return bcrypt.hashSync(password,salt)
}
const checker=(password,DBpassword)=>{
    return bcrypt.compareSync(password,DBpassword)
}

module.exports={hasher,checker}