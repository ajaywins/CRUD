import Joi from 'joi';
import { Request, Response } from "express";
import store from "../stores/storage";
import bcrypt from 'bcrypt';
import sendRespons from '../utils/response'
import STATUS_CODES from '../utils/status'
import jwt from 'jsonwebtoken';

//PostStudentDetails...

let newStudent = async function (req: Request, res: Response) {

    const schema = Joi.object({
        name: Joi.string().required(),
        age: Joi.number().required(),
        tech: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
    });

    const parmas = schema.validate(req.body, { abortEarly: false });
    if (parmas.error) {

        return sendRespons(res, { msg: parmas.error.message }, STATUS_CODES.BAD_REQUEST)
    }
    let userInput = req.body;
    userInput.password = await bcrypt.hash(userInput.password, 10);
    const student = new store({
        name: userInput.name,
        age: userInput.age,
        tech: userInput.tech,
        email: userInput.email,
        password: userInput.password

    })
    student.save()

    return sendRespons(res, { msg: "user created", id: student._id }, STATUS_CODES.OK)
}

//GetByName...

let StudentByName = async (req: Request, res: Response) => {
    try {
        const student = await store.findOne({ name: req.params.name })
        if (!req.params.name) {
            return res.send()
        }
        // student.save()
        res.status(200).send({ data: student });
    } catch (e) {
        res.status(404).send(e)
    }
}

//GetAllStudentDetails...

let allStudentDetails = async (req: Request, res: Response) => {
    const students = await store.find({})
    // console.log(students)
    return sendRespons(res, { msg: students }, STATUS_CODES.OK)

}
//GetStudentDetailsById...

let StudentDetailsById = async (req: Request, res: Response) => {
    try {
        const studentsById = await store.findById(req.params.id)
        if (studentsById === null) {
            return sendRespons(res, { msg: "User Not Found" }, STATUS_CODES.NOT_FOUND)
        }
        else {

            // res.send(studentsById);
            return sendRespons(res, { msg: studentsById }, STATUS_CODES.OK)
        }
    } catch (e) {
        return sendRespons(res, { msg: "User Not Found" }, STATUS_CODES.NOT_FOUND)
    }
}

//deleteStudentDetails...

let deleteStudentDetails = async (req: Request, res: Response) => {
    try {
        const deleteStudent = await store.findByIdAndDelete(req.params.id)
        if (deleteStudent === null) {
            return sendRespons(res, { msg: "User Not Found" }, STATUS_CODES.NOT_FOUND)
        }
        else {
            return sendRespons(res, { msg: "deleted" }, STATUS_CODES.OK)
            // res.send(deleteStudent);
        }
    } catch (e) {
        return sendRespons(res, { msg: "User Not Found" }, STATUS_CODES.NOT_FOUND)
    }
}

//updateStudentDetails...

let updateStudentDetails = async (req: Request, res: Response) => {
    try {
        const UpdateStudent = await store.findByIdAndUpdate(req.params.id, req.body)
        if (UpdateStudent === null) {

            return sendRespons(res, { msg: "No data updated" }, STATUS_CODES.NOT_MODIFIED)
        }
        else {
            return sendRespons(res, { msg: "User Updated" }, STATUS_CODES.OK)
        }
    } catch (e) {
        return sendRespons(res, { msg: "User Not Found" }, STATUS_CODES.NOT_FOUND)
    }

}
//userLogin and Authentication and Token...

let loginUser = async (req: Request, res: Response) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const studentlogin: any = await store.findOne({ email: email })


        const comparePassword = await bcrypt.compare(password, studentlogin.password)

        if (comparePassword === true) {

            const token = jwt.sign({ _id: "627904f6dcf476aacd5d8826" }, "qwertyuiopasdfghjklzxcvbnmqwerty");

            return sendRespons(res, { msg: "Login Sucessfull", token: token }, STATUS_CODES.OK)
        }
        else {
            return sendRespons(res, { msg: "Invalid Credential" }, STATUS_CODES.UN_AUTHORIZED)
        }
    } catch (e) {
        return sendRespons(res, { msg: "Invalid Credential" }, STATUS_CODES.NOT_FOUND)
    }
}

export const UserController = {
    newStudent,
    StudentByName,
    allStudentDetails,
    StudentDetailsById,
    deleteStudentDetails,
    updateStudentDetails,
    loginUser,
}

