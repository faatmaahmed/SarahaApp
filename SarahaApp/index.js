import path from 'path'
import*as dotenv from 'dotenv'
import  bootstrap  from './src/app.controller.js'
import  express  from 'express'
import { sendEmail } from './src/utils/email/sendEmails.js';

dotenv.config({path:path.join(path.resolve(),'./src/config/.env.prod')})
const app = express()

const PORT=process.env.PORT
bootstrap(app , express)

await sendEmail({to:""})


app.listen(PORT, () => 
    console.log(`Example app listening on port ${PORT}!`))


