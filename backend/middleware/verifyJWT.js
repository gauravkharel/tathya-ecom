const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyJWT = (req, res, next) => {
    //gets the header from request
    const authHeader = req.headers.authorization || req.headers.Authorization
    // check if it containes the auth header
    if(!authHeader) return res.sendStatus(401)

    //for roles change upper code to
    /**
     * if(!authHeader?.startsWith('Bearer ')) return res.sendStatus(401)
     */
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
        /**
         * req.user = decoded.UserInfo.username
         * req.roles = decoded.UserInfor.roles
         */
            next()
        }
    )
    console.log('Token: ',token)

}

module.exports = verifyJWT