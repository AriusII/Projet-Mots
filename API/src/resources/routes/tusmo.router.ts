import express from 'express'
import * as TusmoController from '../../controllers/tusmo/tusmo.controller'
const rTusmo = express.Router()

rTusmo.get('/', TusmoController.get)
rTusmo.post('/find', TusmoController.post)

export default rTusmo