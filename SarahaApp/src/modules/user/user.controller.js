import { Router } from "express";
import * as userServices from "./service/user.service.js";
import { authentication, authorization } from "../../midedleware/auth.middleware.js";
import { endpoint } from "./user.endpoint.js";
import { validation } from "../../midedleware/validation.middelware.js";
import * as validators from './user.validation.js'



const router=Router()

router.get("/Profile",
    authentication(),
    authorization(endpoint.Profile)
    ,userServices.Profile)

    router.get("/shareProfile/:userId",
        validation(validators.shareProfile),
        userServices.shareProfile)


    router.patch("/updateProfile",
        validation(validators.udateprofile),
        authentication(),
        authorization(endpoint.Profile)
        ,userServices.updateProfile)

        router.patch('/updatePassword'
            ,validation(validators.udatepassword)
            ,authentication(),authorization(endpoint.Profile),
            userServices.updatePassword)

            router.delete("/freezProfile",
                validation(validators.udatepassword),
                authentication(),
                authorization(endpoint.Profile)
                ,userServices.freezProfile)

export default router