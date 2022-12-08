import { Router } from 'express'
const router = Router()
import { signin } from './controller'

router.put('/', signin)

export default router
