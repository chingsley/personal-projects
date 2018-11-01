import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db';  // import db from '../db/index.js';
import Helper from './Helper';

const User = {

    /**
     * Create A User 
     * @param {object} req
     * @param {object} res
     * @returns {object} reflection object
     */
    async create(req, res) {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send({'message': 'Some values are missing'});
        }
        let emailChecker = Helper.isValidEmail(req.body.email); // returns an object with 'error' and 'message' property
        console.log('line 58 Users.js', emailChecker.error);
        if (emailChecker.error) { // the error property is true if there is an error, and false if there is no error
            return res.status(400).send({ 'invalid mail': emailChecker.message }); // the message property contains information about what is wrong with the email
        }
        // if(!Helper.isValidEmail(req.body.email)) {
        //     return res.status(400).send({'message': 'Please enter a valid email address'});
        // }
        const hashPassword = Helper.hashPassword(req.body.password);

        const createQuery = `INSERT INTO 
            users(id, email, password, created_date, modified_date)
            VALUES($1, $2, $3, $4, $5)
            returning *`;
        const values = [
            uuidv4(),
            req.body.email,
            hashPassword,
            moment(new Date()),
            moment(new Date())
        ];
        
        try {
            const { rows } = await db.query(createQuery, values);
            const token = Helper.generateToken(rows[0].id);
            return res.status(201).send({'message': 'User created Successfully', 'token': token});
        } catch(error) {
            if (error.routine === '_bt_check_unique') {
                return res.status(400).send({'message':'User with that EMAIL already exists' });
            }
            return res.status(400).send(error);
        }
    },

    /**
     * Login
     * @param {object} req 
     * @param {object} res
     * @returns {object} user object
     */
    async login(req, res) {
        console.log(req.body.email, req.body.password);
        if (!req.body.email || !req.body.password) {
            return res.status(400).send({'message':'Some values are missing'});
        }
        let emailChecker = Helper.isValidEmail(req.body.email);
        if(emailChecker.error) {
            return res.status(400).send({'invalid mail': emailChecker.message});
        }
        // if(!Helper.isValidEmail(req.body.email)) {
        //     return res.status(400).send({'message': 'Please a enter a valid email address'});
        // }
        const text = `SELECT * FROM users WHERE email = $1`;
        try {
            const { rows } = await db.query(text, [req.body.email]);
            if (!rows[0]) {
                return res.status(400).send({'message':'The credentials you provided are incorrect'});
            }
            if(!Helper.comparePassword(rows[0].password, req.body.password)) {
                return res.status(400).send({'message': 'The credentials you provided are incorrect'});
            }
            const token = Helper.generateToken(rows[0].id);
            return res.status(200).send({'message': 'login Successgful!', 'token': token});
        } catch(error) {
            return res.status(400).send(error);
        }
    },

    /**
     * Delete A User 
     * @param {object} req 
     * @param {object} res 
     * @returns {void} returns status code 204
     */
    async delete(req, res) {
        const deleteQuery = `DELETE FROM users WHERE id=$1 returning *`;
        try {
            const { rows }  = await db.query(deleteQuery, [req.user.id]);
            if (!rows[0]) {
                return res.status(404).send({'message': 'user not found'});
            }
            return res.status(204).send({'message': 'deleted'});
        } catch(error) {
            return res.status(400).send(error);
        }
    }

}

export default User;

