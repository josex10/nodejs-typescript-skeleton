import express, { Router, Request, Response, NextFunction} from "express";
import { RoleController } from "../controllers";
import { GenericValidator, RoleValidator } from "../validators";

export default class RoleRoute {

    private router: Router;

    constructor(
        private roleController: RoleController = new RoleController(),
        private genericValidator: GenericValidator = new GenericValidator(),
        private roleValidator: RoleValidator = new RoleValidator()
        ) {
        this.router = express.Router();
        this.setRoutes();
    }

    setRoutes(): void {

        this.router.get     ('/role',               
            async (req: Request, res: Response):Promise<void> => await this.roleController.getAllRoles  (req, res));

        this.router.get     ('/role/:uid', 
            this.genericValidator.uidValidationRules(),   
            (req: Request, res: Response, next: NextFunction): void => {
                this.genericValidator.executeValidator(req, res, next)
            },
            async (req: Request, res: Response):Promise<void> => await this.roleController.getRoleById  (req, res));

        this.router.post    ('/role',
            this.roleValidator.roleValidationRules(),     
            (req: Request, res: Response, next: NextFunction): void => {
                this.genericValidator.executeValidator(req, res, next)
            },      
            async (req: Request, res: Response):Promise<void> => await this.roleController.createRole   (req, res));

        this.router.put     ('/role/:uid', 
            this.genericValidator.uidValidationRules(),
            this.roleValidator.roleValidationRules(),   
            (req: Request, res: Response, next: NextFunction): void => {
                this.genericValidator.executeValidator(req, res, next)
            },      
            async (req: Request, res: Response):Promise<void> => await this.roleController.updateRole   (req, res));

        this.router.delete  ('/role/:uid', 
            this.genericValidator.uidValidationRules(),  
            (req: Request, res: Response, next: NextFunction): void => {
                this.genericValidator.executeValidator(req, res, next)
            },       
            async (req: Request, res: Response):Promise<void> => await this.roleController.deleteRole   (req, res));

        this.router.put     ('/role/activate/:uid', 
            this.genericValidator.uidValidationRules(),
            (req: Request, res: Response, next: NextFunction): void => {
                this.genericValidator.executeValidator(req, res, next)
            },
            async (req: Request, res: Response):Promise<void> => await this.roleController.activateRole (req, res));
    }


    getRouter(): express.Router {
        return this.router;
    }
}