import { Router } from 'express'
const router = Router()
import authenticate from '../auth/middleware'
import { getAllPosts, createPost, deletePost, editPost } from './controller'

router.get('/', getAllPosts)
router.post('/', authenticate, createPost)
router.delete('/:id', authenticate, deletePost)
router.put('/:id', authenticate, editPost)

export default router
