import express from "express"
import IndexController from '../Controller/index.js'
import UserController from '../Controller/user.js'
const router = express.Router()

router.get('/' , IndexController.home)
router.get('/user' , UserController.user)
router.get('/user/:id' , UserController.userId)
router.post('/user' , UserController.userAdd)
router.delete('/user/:id' , UserController.userDelete)
router.put('/user/:id' , UserController.userEdit)

export default router