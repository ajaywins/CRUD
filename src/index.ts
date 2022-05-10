import App from './app';
import dotenv from 'dotenv'
// import {PORT} from "./env";
dotenv.config()
let Port:any= process.env.PORT||4000
// let Port:any = PORT
new App(Port).listen();


