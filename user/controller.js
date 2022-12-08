import { sign } from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes'
import User from './model'

const signin = async (req, res) => {
    const { username, password } = req.body
    const user = new User()
    user.create(username, password)
    const token = sign({ "userId": user._id, username }, process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFETIME })
    res.status(StatusCodes.CREATED).json({
        "username": username,
        "token": token
    })
}

export default {
    signin,
}
