import { StatusCodes } from 'http-status-codes'
import Post from './model'

const getAllPosts = async (req, res) => {
    const posts = await Post.find()
    res.status(StatusCodes.OK).json({ posts })
}

const createPost = async (req, res) => {
    const post = new Post(req.body.textContent, req.user.username, req.user.userId)
    const saved = await post.save()
    if (!saved) {
        return res.status(StatusCodes.EXPECTATION_FAILED).json({ success: false })
    }
    return res.status(StatusCodes.CREATED).json({ post })
}

const deletePost = async (req, res) => {
    const {
        user: { userId },
        params: { id: postId },
    } = req
    const post = await Post.findByIdAndRemove(postId, userId)
    if (post) {
        return res.status(StatusCodes.OK).json({ 'success': 'true' })
    }
    return res.status(StatusCodes.NOT_FOUND).json({ 'success': 'false' })
}

const editPost = async (req, res) => {
    const {
        params: { id: postId },
    } = req
    const post = await Post.findByIdAndEdit(postId, req.user.userId, req.body.textContent)
    if (post) {
        return res.status(StatusCodes.OK).json({ 'success': 'true' })
    }
    return res.status(StatusCodes.NOT_FOUND).json({ 'success': 'false' })
}

export default {
    getAllPosts,
    createPost,
    deletePost,
    editPost
}