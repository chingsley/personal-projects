// import moment from 'moment';
// import uuidv4 from 'uuid/v4';
// import db from '../db';

// const Reflection = {
//   /**
//      * Create A Reflection
//      * @param {object} req
//      * @param {object} res
//      * @returns {object} reflection object
//      */

//   async create(req, res) {
//     const text = `INSERT INTO 
//         reflections(id, success, low_point, take_away, create_date, modified_date) 
//         VALUES($1, $2, $3, $4, $5, $6) 
//         returning *`;
//     const values = [
//       uuidv4(),
//       req.body.success,
//       req.body.low_point,
//       req.body.take_away,
//       moment(new Date()),
//       moment(new Date()),
//     ];

//     try {
//       const { row } = await db.query(text, values);
//       return res.status(201).send(row[0]);
//     } catch (error) {
//       return res.status(400).send(error);
//     }
//   },

//   /**
//    * Get All Reflections
//    * @param {object} req
//    * @param {object} res
//    * @returns {object} reflections array
//    */
//   async getAll(req, res) {
//     const findAllQuery = 'SELECT * FROM reflections';
//     try {
//       const { rows, rowCount } = await db.query(findAllQuery);
//       return res.status(200).send({ rows, rowCount });
//     } catch (error) {
//       return res.status(400).send(error);
//     }
//   },

//   /**
//    * Get A Reflection
//    * @param {object} req
//    * @param {object} res
//    * @returns {object} reflection object
//    */
//   async getOne(req, res) {
//     const text = 'SELECT * FROM reflections WHERE id = $1';
//     try {
//       const { rows } = await db.query(text, [req.params.id]);
//       if (!rows[0]) {
//         return res.status(404).send({ message: 'reflection not found' });
//       }
//       return res.status(200).send(rows[0]);
//     } catch (error) {
//       return res.status(400).send(error);
//     }
//   },

//   /**
//    * Update A Reflection
//    * @param {object} req
//    * @param {object} res
//    * @returns {object} updated reflection
//    */
//   async update(req, res) {
//     const findOneQuery = 'SELECT * FROM reflections WHERE id=$1';
//     const updateOneQuery = `UPDATE reflections
//         SET success=$1, low_point=$2, take_away=$3, modified=$4 
//         WHERE id=$5 returning *`;
//     try {
//       const { rows } = await db.query(findOneQuery, [req.params.id]);
//       if (!rows[0]) {
//         return res.status(404).send({ message: 'reflection not found' });
//       }
//       const values = [
//         req.body.success || rows[0].success,
//         req.body.low_point || rows[0].low_point,
//         req.body.take_away || rows[0].take_away,
//         moment(new Date()),
//         req.params.id,
//       ];
//       const response = await db.query(updateOneQuery, values);
//       return res.status(200).send(response.rows[0]);
//     } catch (err) {
//       return res.status(400).send(err);
//     }
//   },

//   /**
//    * Delete A Reflection
//    * @param {object} req
//    * @param {object} res
//    * @returns {void} returns status code 204
//    */
//   async delete(req, res) {
//     const deleteQuery = 'DELECT * FROM reflections WHERE id=$1 returning *';
//     try {
//       const { rows } = await db.query(deleteQuery, [req.body.params]);
//       if (!rows[0]) {
//         return res.status(404).send({ message: 'reflection not found' });
//       }
//       return res.status(204).send({ message: 'deleted' });
//     } catch (error) {
//       return res.status(400).send(error);
//     }
//   },
// };

// export default Reflection;






// src/usingDB/controllers/Reflection.js
import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db';
import dotenv from 'dotenv';
/***************************************************/
// import pg from 'pg';
// import dotenv from 'dotenv';

// dotenv.config();


// const pool = new pg.Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// pool.on('connect', () => {
//   console.log('db connection successful!');
// });

/************************************************* */



const Reflection = {
  /**
   * Create A Reflection
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object 
   */
  async create(req, res) {
    const text = `INSERT INTO
      reflections(id, success, low_point, take_away, owner_id, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      returning *`;
    const values = [
      uuidv4(),
      req.body.success,
      req.body.low_point,
      req.body.take_away,
      req.user.id,
      moment(new Date()),
      moment(new Date())
    ];
    // console.log(values);
    try {
      const { rows } = await db.query(text, values);
      return res.status(201).send(rows[0]);
    } catch(error) {
      return res.status(400).send(error);
    }
  },
  /**
   * Get All Reflection
   * @param {object} req 
   * @param {object} res 
   * @returns {object} reflections array
   */
  async getAll(req, res) {
    const userFindAllQuery = 'SELECT * FROM reflections WHERE owner_id = $1';
    const adminFindAllQuery = 'SELECT * FROM reflections';
    try {
      // const { rows, rowCount } =  await db.query(findAllQuery, [req.user.id]);
      let result = {};
      if(req.user.email === process.env.ADMIN) {
         result = await db.query(adminFindAllQuery);
      } else {
         result = await db.query(userFindAllQuery, [req.user.id]);
      }
      // const result = await db.query(userFindAllQuery, [req.user.id]);
      // console.log(result);
      if(!result.rows[0]) {
        return res.status(404).send({'message': 'no reflections found'});
      }
      const { rows, rowCount } = result;
      return res.status(200).send({ rows, rowCount });
    } catch(error) {
      return res.status(400).send(error);
    }
  },

  // /**
  //  * 
  //  * @param {object} req 
  //  * @param {object} res
  //  * @returns {object} reflection array
  //  */
  // async adminGetAll(req, res) {
  //   const findAll = 'SELECT * FROM reflections';
  //   try {
  //     const { rows, rowCount } = await db.queryAll(findAll);
  //     return res.status(200).send({rows, rowCount});
  //   } catch(error) {
  //     return res.status(400).send(error);
  //   }
  // },
  /**
   * Get A Reflection
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object
   */
  async getOne(req, res) {
    let text = '';
    if(req.user.email === process.env.ADMIN) {
      text = 'SELECT * FROM reflections WHERE id=$1';
    } else {
      text = 'SELECT * FROM reflections WHERE id = $1 AND owner_id = $2';
    }
    try {
      let result = {};
      if(req.user.email === process.env.ADMIN) {
        result = await db.query(text, [req.params.id]);
      } else {
        result = await db.query(text, [req.params.id, req.user.id]);
      }
      // console.log(result);
      // const { rows } = await db.query(text, [req.params.id]);
      if (!result.rows[0]) {
        return res.status(404).send({'message': 'reflection not found'});
      }
      return res.status(200).send(result.rows[0]);
    } catch(error) {
      return res.status(400).send(error)
    }
  },
  /**
   * Update A Reflection
   * @param {object} req 
   * @param {object} res 
   * @returns {object} updated reflection
   */
  async update(req, res) {
    const findOneQuery = 'SELECT * FROM reflections WHERE id=$1 AND owner_id = $2';
    const updateOneQuery =`UPDATE reflections
      SET success=$1,low_point=$2,take_away=$3,modified_date=$4
      WHERE id=$5 AND owner_id = $6 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.id, req.user.id]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'reflection not found'});
      }
      const values = [
        req.body.success || rows[0].success,
        req.body.low_point || rows[0].low_point,
        req.body.take_away || rows[0].take_away,
        moment(new Date()),
        req.params.id,
        req.user.id
      ];
      const response = await db.query(updateOneQuery, values);
      return res.status(200).send(response.rows[0]);
    } catch(err) {
      return res.status(400).send(err);
    }
  },
  /**
   * Delete A Reflection
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return statuc code 204 
   */
  async delete(req, res) {
    // const deleteQuery = 'DELETE FROM reflections WHERE id=$1 AND owner_id = $2 returning *';
    let deleteQuery = '';
    if(req.user.email === process.env.ADMIN) {
      deleteQuery = 'DELETE FROM reflections WHERE id=$1 returning *';
    } else {
      deleteQuery = 'DELETE FROM reflections WHERE id=$1 AND owner_id=$2 returning *';
    }

    try {
      let result = {};
      if(req.user.email === 'admin@gmail.com') {
        result = await db.query(deleteQuery, [req.params.id]);
        console.log('line 288, reflection.js, result = ',result);
      } else {
        result = await db.query(deleteQuery, [req.params.id, req.user.id]);
      }
      if(!result.rows[0]) {
        return res.status(404).send({'message': 'reflection not found'});
      }
      return res.status(204).send({ 'message': 'deleted' });
    } catch(error) {
      return res.status(400).send(error);
    }
  }
}

export default Reflection;