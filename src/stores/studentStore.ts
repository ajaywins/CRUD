import { any } from 'joi';
import IUSER from '../interface/user/IUSER';
import studentModel from '../models/model';
import { Status } from '../utils/enums/enums'
// import {Role} from '../utils/enums/enums'



export default class UserStore {


    async getUserByEmail({ email }) {
        let student: IUSER
        try {
            student = await studentModel.findOne({ email })
        } catch (e) {
            console.log(e)
        }
        return student
    }
    async createNewStudent(user) {
        let userInput = user
        let student: IUSER
        try {
            student = new studentModel( userInput )
            return student
        } catch (e) {
            console.log(e)
        }
    }
    async getUserByAttribute(attributes: Partial<IUSER>) {
        let student: IUSER
        try {
            student = await studentModel.findOne(attributes)
            return student
        } catch (e) {
            console.log(e)
        }
    }

    // async newStudent()
    async getAllStudentDetails() {
        let student: IUSER
        try {
            let student = await studentModel.find({})
            if (student) {


            }
            return student
        } catch (e) {
            console.log(e)
        }
        return
    }
    async deleteById(userId) {
        let student: IUSER
        try {
            student = await studentModel.findById(userId).lean()
            if (student !== null) {
                let deleteStudent = await studentModel.updateOne({ _id: userId }, { $set: { status: Status.INACTIVE } })
                return student
            } else {
                console.log("error")
            }

        } catch (e) {
            console.log(e)
        }
        return student
    }
}
