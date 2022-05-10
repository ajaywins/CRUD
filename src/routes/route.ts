import {UserController}from '../controllers/user'
import express from 'express';
export const route = express.Router();


route.post('/create',UserController.newStudent);
route.get('/getData',UserController.allStudentDetails);
route.get('/getName/:name',UserController.StudentByName);
route.get('/getDataBy/:id',UserController.StudentDetailsById);
route.delete('/delete/:id',UserController.deleteStudentDetails);
route.patch('/updateDetails/:id',UserController.updateStudentDetails);
route.post('/login',UserController.loginUser);

