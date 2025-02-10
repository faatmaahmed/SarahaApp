import path from 'path'
import*as dotenv from 'dotenv'
import  bootstrap  from './src/app.controller.js'
import  express  from 'express'
import { sendEmail } from './src/utils/email/sendEmails.js';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
dotenv.config({path:path.join(path.resolve(),'./src/config/.env.prod')})
const app = express()

const PORT=process.env.PORT
bootstrap(app , express)

await sendEmail({to:"fatma.ahmed.mn3m@gmail.com"})


app.listen(PORT, () => 
    console.log(`Example app listening on port ${PORT}!`))


