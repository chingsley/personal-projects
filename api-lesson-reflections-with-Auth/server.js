import express from 'express';
import dotenv from 'dotenv';
import 'babel-polyfill'; // makes it possible for us to use Promises
import ReflectionWithJsObject from './src/usingJSObject/controllers/Reflection';
import ReflectionWithDB from './src/usingDB/controllers/Reflection';
import UserWithDb from './src/usingDB/controllers/Users';
import Auth from './src/usingDB/middleware/Auth';

dotenv.config();
const Reflection = process.env.TYPE === 'db' ? ReflectionWithDB : ReflectionWithJsObject;

// console.log(Reflection);

const app = express()

app.use(express.json());

app.get('/', (req, res) => {
    return res.status(200).send({'message': 'YAY! Congratulations!'});
});

// app.get('/api/v1/all-reflections', Auth.verifyAdminToken, Reflection.adminGetAll);
app.post('/api/v1/reflections', Auth.verifyToken, Reflection.create);
app.get('/api/v1/reflections', Auth.verifyToken, Reflection.getAll);
app.get('/api/v1/reflections/:id', Auth.verifyToken, Reflection.getOne);
app.put('/api/v1/reflections/:id', Auth.verifyToken, Reflection.update);
app.delete('/api/v1/reflections/:id', Auth.verifyToken, Reflection.delete);
app.post('/api/v1/users', UserWithDb.create);
app.post('/api/v1/users/login', UserWithDb.login);
app.delete('/api/v1/users/me', Auth.verifyToken, UserWithDb.delete);
app.use('/*', (req, res) => {
    res.status(404).send({'message': 'not found'});
});

app.listen(3000);
console.log('app running on port ', 3000, '...');