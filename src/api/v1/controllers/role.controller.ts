import { RoleService } from "../services";
import { RowDataPacket } from 'mysql2';
import { Request, Response} from "express";
import { HttpResponse } from '../helpers'

export default class RoleController {

    constructor(
        private roleService: RoleService = new RoleService(), 
        private httpResponse: HttpResponse = new HttpResponse()) {}


  /**
   *
   * @param _req
   * @param res
   * @returns Promise<void>
   * @description THIS FUNCTION GET ALL ROLES FROM THE DB
   */
    async getAllRoles(_req: Request, res: Response): Promise<void> {

        // GET THE DATA FROM THE DB (SERVICE)
        const results: RowDataPacket[] = await this.roleService.getAllRoles();

        // CHECK IF SOME DATA WAS RETURNED FROM THE DB
        if(!results[0].length) {
            this.httpResponse.NotFound(res, [])
        }

        // SEND THE RESPONSE TO THE CLIENT
        this.httpResponse.Ok(res, results[0])
    }

    /**
   *
   * @param req
   * @param res
   * @returns Promise<void>
   * @description THIS FUNCTION GET A ROLES BY ID FROM THE DB
   */
    async getRoleById(req: Request, res: Response): Promise<void> {

        // GET THE UID FROM THE URL
        const { uid } = req.params

        // GET THE DATA FROM THE DB (SERVICE)
        const results = await this.roleService.getRoleById( Number(uid) );

        // CHECK IF SOME DATA WAS RETURNED FROM THE DB
        (!results[0].length)
            // SEND THE RESPONSE TO THE CLIENT
            ?this.httpResponse.NotFound(res, [])
            :this.httpResponse.Ok(res, results[0])
    }

   /**
   *
   * @param req
   * @param res
   * @returns Promise<void>
   * @description THIS FUNCTION UPDATE THE ROLE ON THE DB
   */
  async createRole (req: Request, res: Response): Promise<void> {

    try {
        // GET THE DATA FROM THE BODY
        const { description, name } = req.body

        // GET THE DATA FROM THE DB (SERVICE)
        const results = await this.roleService.createRole( name, description );

        // CHECK IF THE DATA AFFECTED THE DB
        (!results.affectedRows)
            // SEND THE RESPONSE TO THE CLIENT
            ? this.httpResponse.NotFound(res, results)
            : this.httpResponse.Ok(res, results)

    } catch (e) {
        this.httpResponse.Error(res, e)
    }
    
  }

    /**
   *
   * @param req
   * @param res
   * @returns Promise<void>
   * @description THIS FUNCTION UPDATE THE ROLE ON THE DB
   */
  async updateRole (req: Request, res: Response): Promise<void> {
    // GET THE DATA FROM THE BODY
    const { description, name } = req.body

    // GET THE ID FROM THE URL
    const { uid } = req.params

    // GET THE DATA FROM THE DB (SERVICE)
    const results = await this.roleService.updateRole( Number(uid), name, description);

    // CHECK IF THE DATA AFFECTED THE DB
    (!results.affectedRows)
        // SEND THE RESPONSE TO THE CLIENT
        ? this.httpResponse.NotFound(res, results)
        : this.httpResponse.Ok(res, results);
  }

  /**
   *
   * @param req
   * @param res
   * @returns Promise<void>
   * @description THIS FUNCTION UPDATE THE ROLE ON THE DB BUT ONLY THE ACTIVE COLUMN AND DELETEAT COLUMN
   */
   async deleteRole (req: Request, res: Response): Promise<void> {

    // GET THE ID FROM THE URL
    const { uid } = req.params

    // GET THE DATA FROM THE DB (SERVICE)
    const results = await this.roleService.deleteRole( Number(uid) );

    // CHECK IF THE DATA AFFECTED THE DB
    (!results.affectedRows)
        // SEND THE RESPONSE TO THE CLIENT
        ? this.httpResponse.NotFound(res, results)
        : this.httpResponse.Ok(res, results);
  }

  /**
   *
   * @param req
   * @param res
   * @returns Promise<void>
   * @description THIS FUNCTION UPDATE THE ROLE ON THE DB BUT ONLY THE ACTIVE COLUMN AND DELETEAT COLUMN
   */
   async activateRole (req: Request, res: Response): Promise<void> {

    // GET THE ID FROM THE URL
    const { uid } = req.params

    // GET THE DATA FROM THE DB (SERVICE)
    const results = await this.roleService.activatedRole( Number(uid) );

    // CHECK IF THE DATA AFFECTED THE DB
    (!results.affectedRows)
        // SEND THE RESPONSE TO THE CLIENT
        ? this.httpResponse.NotFound(res, results)
        : this.httpResponse.Ok(res, results);
  }

    /**
    *
    * @param roleName
    * @returns Boolean IF THE NAME EXIST RETURN TRUE
    * @desdescription CHECK THE ROLE NAME TO AVOID DUPLICATE NAMES
    */
    async getRoleByName(roleName: string): Promise<boolean> {

        // GET THE DATA FROM THE DB (SERVICE)
        const results = await this.roleService.getRoleByName( roleName );

        // CHECK IF SOME DATA WAS RETURNED FROM THE DB
        if (!results[0].length) {
            return false;
        }
        return true;
    }

}