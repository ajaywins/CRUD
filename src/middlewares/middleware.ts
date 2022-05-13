import jwt from 'jsonwebtoken';
import sendRespons from '../utils/response'
import STATUS_CODES from '../utils/status'


const auth = async (req, res, next) => {
    try {
        const tokenString = req.headers.authorization
        
        let token = tokenString.replace('Bearer ', "") 
        // console.log(token)
        let secretkey = process.env.SECRET_KEY
        
        const verifyUser: any = jwt.verify(token,secretkey)
        if(!verifyUser){
            req.userId = verifyUser._id
           return  sendRespons(res, { msg: "User Unauthorized" }, STATUS_CODES.UN_AUTHORIZED)
            // return sendRespons(res, { msg: "User Authorized", verifyUser: verifyUser }, STATUS_CODES.OK)
        }
        next();
      
    } catch (e) {
            sendRespons(res, { msg: "User Unauthorized" }, STATUS_CODES.UN_AUTHORIZED)
    }
}
export default auth;