import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
    console.log('db connection successful!');
  });

  export default {
    /**
     * DB Query
     * @param {object} req
     * @param {object} res
     * @returns {object} object 
     */
    query(text, params = null){
        // console.log('line 22, /src/usingDb/db/index.js',text, params);

      return new Promise((resolve, reject) => {
        pool.query(text, params || null)
        .then((res) => {
          // console.log('line 27, /src/usingDb/db/index.js', text, params);

          resolve(res);
        })
        .catch((err) => {
          reject(err);
        })
      })
    }, 

    queryAll(text) {
      return new Promise((resolve, reject) => {
        pool.query(text)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        })
      })
    }
  }
