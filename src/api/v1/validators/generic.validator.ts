import { Response, Request, NextFunction } from 'express';
import { CustomValidator, param, ValidationChain, validationResult } from 'express-validator'
import { HttpResponse } from "../helpers";
import { EValidationMessage } from '../enums';

export default class GenericValidator {
    constructor( 
        private httpResponse: HttpResponse = new HttpResponse()
    ){

    }

    /**
     *
     * @param req
     * @param res
     * @param next
     * @returns Response
     * @description THIS FUNCTION EXECUTE ALL THE RULES VALIDATION AND RESPONSE THE CORRECT MESSAGE TO THE CLIENT IN CASE OF ERROR
     */
    executeValidator(req: Request, res: Response, next: NextFunction): void {
        const errors = validationResult(req)
        try {
        if (!errors.isEmpty()) {
            errors.throw()
        }
        return next()
        } catch (e) {
        console.log(e)
        this.httpResponse.UnprocessableEntity(res, errors.array({ onlyFirstError: true })[0])
        }
    }

    /**
     *
     * @param string
     * @returns Promise
     * @description THIS FUNCTION REMOVE ALL THE BLANK SPACES OF THE STRINGS TO CHECK IF THE STRING HAS DATA
     */
    checkEmptyStrings: CustomValidator = async string => {
        const trimString = string.trim()

        if (trimString.length === 0) {
            return await Promise.reject(EValidationMessage.EMPTYSTRING)
        }

        return await Promise.resolve()
    }  

    /**
     *
     * @returns ValidationChain[]
     * @description THIS FUNCTION ADD ALL THE RULES TO GET A ROLE BY ID
     */
    uidValidationRules():ValidationChain[]{
        console.log('into uid def')
        return [
            param('uid')
                .exists().withMessage(EValidationMessage.REQUIRED).bail()
                .isInt().withMessage(EValidationMessage.TYPEINT).bail()
        ]
    }
}