import { body, ValidationChain, CustomValidator } from 'express-validator'
import { RoleController } from '../controllers'
import { GenericValidator } from '../validators';
import { EValidationMessage } from '../enums'

export default class RoleValidator {

    constructor(
        private roleController: RoleController = new RoleController(),
        private genericValidator: GenericValidator = new GenericValidator()
    ){}

    /**
     *
     * @returns ValidationChain[]
     * @description THIS FUNCTION ADD ALL THE RULES TO CREATE A NEW ROLE
     */
    roleValidationRules(): ValidationChain[] {
        return [
        body('description')
            .exists().withMessage(EValidationMessage.REQUIRED).bail()
            .isString().withMessage(EValidationMessage.TYPESTRING).bail()
            .custom(this.genericValidator.checkEmptyStrings).bail()
            .isLength({ min: 5 }).withMessage(EValidationMessage.NOTMINSTRINGLENGTH).bail()
            .isLength({ max: 230 }).withMessage(EValidationMessage.EXCEEDSTRINGLENGTH).bail(),
        body('name')
            .exists().withMessage(EValidationMessage.REQUIRED).bail()
            .isString().withMessage(EValidationMessage.TYPESTRING).bail()
            .custom(this.genericValidator.checkEmptyStrings).bail()
            .isLength({ min: 5 }).withMessage(EValidationMessage.NOTMINSTRINGLENGTH).bail()
            .isLength({ max: 30 }).withMessage(EValidationMessage.EXCEEDSTRINGLENGTH).bail()
            .custom(this.isDuplicateRoleName).bail()
        ]
    }

    /**
     *
     * @param roleName
     * @returns CustomValidator
     * @description THIS IS A CUSTOM VALIDATION FUNCTION TO CHECK IF THE ROLE NAME IS ALREADY INTO THE DB
     */
    isDuplicateRoleName: CustomValidator = (async (roleName: string) => {
        const response = await this.roleController.getRoleByName(roleName.toUpperCase());
        if (response) {
            return await Promise.reject(new Error(`The role name ${String(roleName)} already exists.`))
        }
        return await Promise.resolve()
    }) as CustomValidator
}