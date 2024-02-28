const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyJWT = (req, res, next) => {
    //gets the header from request
    const authHeader = req.header('authorization')
    // check if it containes the auth header
    if(!authHeader) return res.sendStatus(401)
    // save the token 
    const token = authHeader.split(' ')[1]
    //verify it
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            // invalid token
            if(err) return res.sendStatus(403, 'Token do not match.')
            req.user = decoded.firstName
            next()
        }
    )
    console.log('Token: ',token)

}

module.exports = verifyJWT