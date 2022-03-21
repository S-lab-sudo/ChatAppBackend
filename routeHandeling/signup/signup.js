const getIp = require('../../helperFunctions/getIp')
const passwordHC = require('../../helperFunctions/passwordHasherAndChecker')
const tokenMC = require('../../helperFunctions/tokenCheckerAndMaker')
const newUserModel = require('../../mongooseModel/newUserModel')
const newUserSaver = require('../../helperFunctions/newUserSaver')
const tokenSaver = require('../../helperFunctions/tokenSaver')
const mailSender = require('../../helperFunctions/mailSender')
const {
    validationResult
} = require('express-validator');

const signup = async (req, res) => {
    try {
        const body = req.body

        // FIRST LOG
        console.log('Signup request from ', body.ip, 'with body ', req.body)

        // Validation is all data recived
        if (!body.name || !body.email || !body.password || !body.confirmPassword || !body.ip || body.password !== body.confirmPassword) {
            console.log('Required Data not recieved')
            return res.status(203).json({
                error: true,
                message: "Please fill the form properly"
            })
        }

        // VALIDATIONS FROM EXPRESS-CALIDATOR
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('first')
            return res.status(400).json({
                error: true,
                message: "Please fill the form properly"
            })
        }

        // DESTRUCT DATAS
        const {
            name,
            email,
            password,
            ip
        } = req.body

        // USER IPS
        const userIp = getIp(req.socket.remoteAddress)

        // IP VALIDATION 
        if (userIp.ipv4.split(".").length !== 4 || ip.split(".").length !== 4 || ip !== userIp.ipv4) {
            console.log('TODO INVALID IP')
            return res.status(400).json({
                error: true,
                message: 'Invalid Ip'
            })
        }

        // CHECK IF USER EXISTS
        const usersFound = await newUserModel.find({
            email: email
        })

        // NO USERS FOUND
        if (usersFound.length === 0) {
            // HASHING PASSWORD
            const hashedPassword = passwordHC.hasher(password, 16)

            // SAVE NEW USER
            const isNewUserSaved = newUserSaver({
                username: name,
                email,
                password: hashedPassword,
                accountCreationIp: userIp
            })

            // USER SAVED
            if (isNewUserSaved) {
                console.log('User saved', response)

                // CREATE TOKEN
                const token = tokenMC.tokenMaker({
                    userIp,
                    id: response._id
                })

                // SAVE TOKEN TO DATABASE
                const isTokenSaved = tokenSaver({
                    tokenName: "new-user-verification",
                    userId: response._id,
                    token,
                    ip: userIp
                })

                // TOKEN SAVED TO DATABASE
                if (isTokenSaved) {
                    // NEW USER VERIFICATION URL
                    let url = `https://localhost:5000/api/new-user-confirmation?userToken=${token}`

                    // SEND TOKEN TO USER THROUGH MAIL
                    const isSent = await mailSender(url, email)

                    // TOKEN SENT TO USER
                    if (!isSent) {
                        res.status(200).json({
                            success: true,
                            message: "Please check your mail"
                        })
                    } else {
                        // TOKEN NOT SENT TO USER
                        return res.status(500)
                    }
                } else {
                    // ERROR ON SAVE TOKEN TO DABASE
                    return res.status(500)
                }
            } else {
                // ERROR ON SAVE USER TO DABASE
                return res.status(500)
            }
        } else {
            // USER EXISTS ALREADY
            console.log('User Already Exists')
            return res.status(400).json({
                error: true,
                message: "Please use proper Email Address"
            })
        }

    } catch (error) {
        res.status(500)
    }
}
module.exports = signup