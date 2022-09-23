import mysql, { RowDataPacket } from 'mysql2/promise';
import * as dotenv from 'dotenv';
import { ResultSetHeader } from 'mysql2';


export default class MySqlConfig {

    private config: mysql.ConnectionOptions;

    constructor(){

        dotenv.config(); 
        
        this.config = {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        }
    }

    async poolConn(sql: string, params: any[] = []){
        let pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        });

        const conn = await pool.getConnection();
        await conn.ping();
        const rows = await conn.query<RowDataPacket[]>(sql, params);
        conn.release();
        return rows[0];
    }

    async poolConnForSet(sql: string, params: any[] = []){

        let pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        });

        const conn = await pool.getConnection();
        await conn.ping();
        const rows = await conn.execute<ResultSetHeader>(sql, params);
        conn.release();
        return rows[0]; 

    }

    async initialize(): Promise<mysql.Connection> {
        return await mysql.createConnection(this.config);
    }

    async close(conn: mysql.Connection): Promise<void> {
        conn.end();
    }

    async query(query: string, paramaters: any[] = []){
        const connection = await this.initialize();
        const result = connection.query(query, paramaters);
        this.close(connection);
        return result;
    }
}