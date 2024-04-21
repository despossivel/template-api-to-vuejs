import dotenv from "dotenv"
dotenv.config({
    path: process.env.NODE_ENV == 'dev' ? '.env.dev' : process.env.NODE_ENV == 'test' ? '.env.test' : '.env'
})

console.log(process.env.NODE_ENV == 'dev' ? '.env.dev' : process.env.NODE_ENV == 'test' ? '.env.test' : '.env')
 
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import homeRoutes from "./routes/home.js"
import authRoutes from './routes/auth.js'
import userRoutes from "./routes/user.js"
import studentRoutes from "./routes/student.js"

let app = express()

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use([
    homeRoutes,
    authRoutes,
    userRoutes,
    studentRoutes
]);

app.use((req, res, next) => res.status(404).send("Desculpe, não consigo encontrar isso!"));
app.use((err, req, res, next) => res.status(500).send('Algo quebrou!'))

export default app