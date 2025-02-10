import * as registrationService from './service/registration.service.js';
import * as loginService from './service/login.service.js';
import { Router } from 'express'
import { validation } from '../../midedleware/validation.middelware.js';
import * as validators from './auth.validation.js'

const router = Router();



router.post("/signup",validation(validators.signup), registrationService.signup)
router.post('/signUpOtp', validation(validators.signup),registrationService.signUpOtp)
router.patch("/confirm-email",registrationService.confirmEmail)
router.patch('/confirmEmailOtp',validation(validators.confirmEmailOtp),registrationService.confirmEmailOtp)


router.post("/login",validation(validators.login),loginService.login)



export default router