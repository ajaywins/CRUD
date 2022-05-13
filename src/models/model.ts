import mongoose, { model } from "mongoose";
import IUSER from "../interface/user/IUSER";
import {Status} from '../utils/enums/enums'
import {Role} from '../utils/enums/enums'

export const schema = mongoose.Schema;


const studentSchema = new schema<IUSER>({

    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true

    },
    tech: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    status:{
        type :String,
        enum:Status,
        default:Status.ACTIVE,
        
    },
    Role: {
        type: String,
        default: Role.User,
        enum: Role,
    }

})
const studentModel = model('studenDetails', studentSchema);
export default studentModel;

