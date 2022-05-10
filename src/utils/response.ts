import { Response } from "express";

const sendRespons = (res: Response, data:any = {msg:"Invalid request"},status = 400)=>{
    res.status(status).json({data})
}
export default sendRespons;