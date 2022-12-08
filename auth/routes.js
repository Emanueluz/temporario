import { Router } from 'express'
const router = Router()
import { login, logout } from './controller'

router.post('/', login)
router.get('/', logout)

export default router
