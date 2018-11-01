import jwt from 'jsonwebtoken';
import db from '../db'; //import db from '../db/index';

const Auth = {

    /**
     * Verify Token
     * @param {object} req
     * @param {object} res
     * @param {object} next
     * @returns {object|void} response object
     */

     async verifyToken(req, res, next) {
         const token = req.headers['x-access-token'];
         if(!token) {
             return res.status(400).send({'message': 'Token is not provided'});
         }
         try {
             const decoded = await jwt.verify(token, process.env.SECRET);
             const text = `SELECT * FROM users WHERE id=$1`;
             const { rows } = await db.query(text, [decoded.userId]);
            //  console.log('line 23, Auth.js, rows = ', rows);
             if(!rows[0]) {
                 return res.status(400).send({'message': 'The token you provided is invalid'});
             }
             req.user = { id: decoded.userId, email: rows[0].email };
             console.log('line 28, Auth.js, req.user.email = ', req.user.email);
             next();
         } catch(error) { 
             return res.status(400).send(error);
         }
     },

    //  async verifyAdminToken(req, res, next) {
    //     const token = req.headers['x-access-token'];
    //     if(!token) {
    //         return res.status(400).send({'message': 'Token is not provided'});
    //     }
    //     try {
    //         const decoded = await jwt.verify(token, process.env.SECRET);
    //         const text = `SELECT * FROM users WHERE email='eneja.kc@gmail.com' AND id=$1`;
    //         console.log('line 45, Auth.js text = ', text);
    //         const { rows } = await db.query(text, [decoded.userId]);
    //         console.log(rows);
    //         if(!rows[0]) {
    //             return res.status(400).send({'message':'Unauthorised. Admin only'});
    //         }
    //         next();
    //     } catch(error) {
    //         return res.status(400).send(error);
    //     }
    //  }
}
export default Auth;