import { sign } from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes'
import { findOne } from '../user/model'

const login = async (req, res) => {
    const { username, password } = req.body
    const user = await findOne({ username })
    if (user && await user.comparePassword(password)) {
        const token = sign({ "userId": user._id, username }, process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_LIFETIME })
        return res.status(StatusCodes.OK).json({ username, token })
    }
    return res.status(StatusCodes.FORBIDDEN).json({})
}

const logout = (req, res) => {
    return res.status(StatusCodes.OK).json({ username: null, token: null })
}

export default {
    login,
    logout,
}
