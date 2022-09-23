import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { MySqlConfig } from '../config'


export default class RoleService {

    constructor(private mysqlConn = new MySqlConfig()){}

    /**
     * 
     * @returns Promise<RowDataPacket[]>
     */
    async getAllRoles(): Promise<RowDataPacket[]> {
        return await this.mysqlConn.poolConn('CALL SP_CRUD_MASTER_ROLE_GET_ALL()');
    }

     /**
     * 
     * @returns Promise<RowDataPacket[]>
     */
    async getRoleById(uid: number): Promise<RowDataPacket[]> {
        return await this.mysqlConn.poolConn('CALL SP_CRUD_MASTER_ROLE_GET_BY_ID(?)', [uid]);
    }

     /**
     * 
     * @returns Promise<ResultSetHeader>
     */
    async createRole(name: string, description: string): Promise<ResultSetHeader> {
        return await this.mysqlConn.poolConnForSet('CALL SP_CRUD_MASTER_ROLE_INSERT(?, ?)', [name, description]);
    }

    /**
     * 
     * @returns Promise<ResultSetHeader>
     */
     async updateRole(uid: number, name: string, description: string): Promise<ResultSetHeader> {
        return await this.mysqlConn.poolConnForSet('CALL SP_CRUD_MASTER_ROLE_UPDATE_BY_ID(?, ?, ?)', [uid, name, description]);
    }

    /**
     * 
     * @returns Promise<ResultSetHeader>
     */
     async deleteRole(uid: number): Promise<ResultSetHeader> {
        return await this.mysqlConn.poolConnForSet('CALL SP_CRUD_MASTER_ROLE_DISABLE_BY_ID(?)', [ uid ]);
    }

    /**
     * 
     * @returns Promise<ResultSetHeader>
     */
     async activatedRole(uid: number): Promise<ResultSetHeader> {
        return await this.mysqlConn.poolConnForSet('CALL SP_CRUD_MASTER_ROLE_ENABLE_BY_ID(?)', [ uid ]);
    }

    /**
     * 
     * @returns Promise<RowDataPacket[]>
     */
     async getRoleByName(name: string): Promise<RowDataPacket[]> {
        return await this.mysqlConn.poolConn('CALL SP_CRUD_MASTER_ROLE_BY_NAME(?)', [name]);
    }
}