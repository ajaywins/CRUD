import jwt from 'jsonwebtoken';
import sendRespons from '../utils/response'
import STATUS_CODES from '../utils/status'
import multer from 'multer'
// import loginUser from '../controllers/user'

const auth = async (req, res, next) => {
    try {
        const tokenString = req.headers.authorization
        
        let token = tokenString.replace('Bearer ', "") 
        // console.log(token)
        let secretkey = process.env.SECRET_KEY
        
        const verifyUser: any = jwt.verify(token,secretkey)
        console.log(verifyUser)
        if(verifyUser){
            // req.userId = verifyUser._id

            return sendRespons(res, { msg: "User Authorized", verifyUser: verifyUser }, STATUS_CODES.OK)
        }else{
            return sendRespons(res, { msg: "User Unauthorized" }, STATUS_CODES.UN_AUTHORIZED)
        }
        next();
      
    } catch (e) {
        return sendRespons(res, { msg: "User Unauthorized" }, STATUS_CODES.UN_AUTHORIZED)
    }
}
export default auth;

// export default auth;


const fileUpload = async(req,res,next)=>{

    const storage = multer.diskStorage({

destination: function (req, file, cb) {
    cb(null, '../uploads')
},

filename: function (req: any, file: any, cb: any) {
    cb(null, file.originalname)
}
});
      
      const upload = multer({ storage: storage })
      console.log(upload);
}
export const upload = fileUpload;

     // grab file from req and console

     // validfileation

    // file name + extension

    // configuration public folder (express
    

    // give route to middleware where file needs to be uploaded ('../../public/uploads/user')

    // in usermodel 'image' property add

    // testing : image url browser => image should open
//     )