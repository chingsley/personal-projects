import bcrypt from 'bcrypt';
import pool from '../db/config';

class AuthController {
    static async signup(req, res, next) {
        const {
            firstname,
            lastname,
            othernames,
            username,
            phoneNumber,
            email,
            password,
            picture,
            registered,
            adminSecret,
        } = req;
        const isAdmin = adminSecret === process.env.ADMIN_SECRET ? true : false;
        console.log(firstname, ', ', lastname, ', ', othernames,', ', username,', ', phoneNumber,', ', email,', ', password,', ', picture,', ', registered,', ', isAdmin);

        try {
            // Hash password and save user to database
            const hashedPassword = await bcrypt.hash(password, 10);
            const dbQuery = `INSERT INTO users(
                firstname,
                lastname,
                othernames,
                username,
                phonenumber,
                email,
                password,
                picture,
                registered,
                is_admin
            ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
            await pool.query(dbQuery, [
                firstname,
                lastname,
                othernames,
                username,
                phoneNumber,
                email,
                hashedPassword,
                picture,
                registered,
                isAdmin
            ]);
            return next();
        } catch (error) {
            return res.status(400).json({ error });
        }
    }// END signup

    static async signin(req, res, next) {
        res.send({message: 'welcome to the sign in controller'});
    }

} // END AuthController

export default AuthController;
