import Joi from 'joi';
import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import sendRespons from '../utils/response'
import STATUS_CODES from '../utils/status'
import jwt from 'jsonwebtoken';
import UserStore from "../stores/studentStore";
import IUSER from 'src/interface/user/IUSER';

const userData: any = new UserStore()

//PostStudentDetails...

let newStudent = async function (req: Request, res: Response) {
    const schema = Joi.object({
        name: Joi.string().required(),
        age: Joi.number().required(),
        tech: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        Role: Joi.string().optional()
    });
    const parmas = schema.validate(req.body, { abortEarly: false });
    if (parmas.error) {
        return sendRespons(res, { msg: parmas.error.message }, STATUS_CODES.BAD_REQUEST)
    }
    let userInput = req.body;
    userInput.password = await bcrypt.hash(userInput.password, 10);

    //create newe user..    
    const student = await userData.createNewStudent(userInput)
    student.save()
    return sendRespons(res, { msg: "user created", id: student._id }, STATUS_CODES.OK)

}
//loginUser..

// const comparePassword = async (hashedPassword, plainPassword) => {
//     //
//     return true
// }

let loginUser = async (req: Request, res: Response) => {
    const { email, password, Role } = req.body
    let student: IUSER
    try {
        student = await userData.getUserByEmail({ email })
        console.log('studentdetail', student)
        if (student) {

            const isValidPassword = await bcrypt.compare(password, student.password) 
            console.log(isValidPassword)
            if (isValidPassword) {
                // Generate new token 
                let secretkey = process.env.SECRET_KEY
                const token = jwt.sign({ _id: "627904f6dcf476aacd5d8826" }, secretkey);
                console.log(token)

                return sendRespons(res, { msg: "Login Sucessfull", token: token }, STATUS_CODES.OK)
            } else {

                return sendRespons(res, { msg: 'Invalid credentials' }, STATUS_CODES.NOT_FOUND)
                // return invalid credentials
            }
        } else {
            // return invalid credentials
            return sendRespons(res, { msg: 'student not found' }, STATUS_CODES.NOT_FOUND);
        }

    } catch (e) {
        return sendRespons(res, { msg: 'student not found' }, STATUS_CODES.NOT_FOUND);
    }
}

//GetAllStudentDetails...

let getAllStudentDetails = async (req: Request, res: Response) => {

    let students = await userData.getAllStudentDetails()
    console.log('students', students)
    // console.log(students)
    return sendRespons(res, { msg: students }, STATUS_CODES.OK)
}
//GetStudentDetailsById...

let StudentDetailsByname = async (req: Request, res: Response) => {

    try {
        const StudentDetailsByname = await userData.getUserByAttribute({ name: req.params.name })
        if (StudentDetailsByname === null) {
            return sendRespons(res, { msg: "user not found" }, STATUS_CODES.NOT_FOUND)
        }
        else {

            // res.send(studentsById);
            return sendRespons(res, { msg: StudentDetailsByname }, STATUS_CODES.OK)
        }
    } catch (e) {
        return sendRespons(res, { msg: "user not found" }, STATUS_CODES.NOT_FOUND)
    }
}

//deleteStudentDetails...

let deleteStudentDetails = async (req: Request, res: Response) => {
    let id = req.params.id

    let user: IUSER
    try {

        // let userExist = await userData.findById(id)
        // console.log(userExist);

        user = await userData.deleteById(id)


        // if (deleteStudent === null) {
        return sendRespons(res, { msg: "user deleted" }, STATUS_CODES.NOT_FOUND)
        // }
        // else {
        //     return sendRespons(res, { msg: "deleted" }, STATUS_CODES.OK)   
        // }
    } catch (e) {
        return sendRespons(res, { msg: "user not found" }, STATUS_CODES.NOT_FOUND)
    }
}

//updateStudentDetails...

// let updateStudentDetails = async (req: Request, res: Response) => {
//     try {
//         const UpdateStudent = await userData.findByIdAndUpdate(req.params.id, req.body)
//         if (UpdateStudent === null) {

//             return sendRespons(res, { msg: "No data updated" }, STATUS_CODES.NOT_MODIFIED)
//         }
//         else {
//             return sendRespons(res, { msg: "User Updated" }, STATUS_CODES.OK)
//         }
//     } catch (e) {
//         return sendRespons(res, { msg: "User Not Found" }, STATUS_CODES.NOT_FOUND)
//     }
// }

export const UserController = {
    newStudent,
    // StudentByName,
    getAllStudentDetails,
    StudentDetailsByname,
    deleteStudentDetails,
    // updateStudentDetails,
    loginUser,
}

