const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyJWT = (req, res, next) => {
    const authHeader = req.header('authorization')
    if(!authHeader) return res.sendStatus(401)
    console.log(authHeader)
    const token = authHeader.split('')[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            // invalid token
            if(err) return res.sendStatus(403)
            req.user = decoded.firstName
            next()
        }
    )
}

module.exports = verifyJWT