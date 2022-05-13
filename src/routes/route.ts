import {UserController}from '../controllers/user'
import express from 'express';
export const route = express.Router();
import auth from '../middlewares/middleware'


route.post('/create',auth,UserController.newStudent);
route.get('/getAllData',UserController.getAllStudentDetails);
route.get('/getDataBy/:name',UserController.StudentDetailsByname);
route.delete('/delete/:id',UserController.deleteStudentDetails);
// route.patch('/updateDetails/:id',UserController.updateStudentDetails);
route.post('/login',UserController.loginUser);

