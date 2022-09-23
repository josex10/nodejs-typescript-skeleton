
import { Response } from 'express';
import { EHttpResponse } from '../enums';


export default class HttpResponse {
    /**
     *
     * @param res
     * @param data
     * @returns Response
     * @description THIS FUNCTION RETURN THE CORRECT STRUCTURE TO RESPONSE FOR THE CLIENT
     */
    Ok (res: Response, data?: any): Response {
      return res.status(EHttpResponse.OK).json({
        status: EHttpResponse.OK,
        statusMsg: 'Success',
        data: data
      })
    }
  
    /**
     *
     * @param res
     * @param data
     * @returns Response
     * @description THIS FUNCTION RETURN THE CORRECT STRUCTURE TO RESPONSE FOR THE CLIENT
     */
    NotFound (res: Response, data?: any): Response {
      return res.status(EHttpResponse.NOT_FOUND).json({
        status: EHttpResponse.NOT_FOUND,
        statusMsg: 'Not Found',
        error: data
      })
    }
  
    /**
     *
     * @param res
     * @param data
     * @returns Response
     * @description THIS FUNCTION RETURN THE CORRECT STRUCTURE TO RESPONSE FOR THE CLIENT
     */
    Unauthorized (res: Response, data?: any): Response {
      return res.status(EHttpResponse.UNAUTHORIZED).json({
        status: EHttpResponse.UNAUTHORIZED,
        statusMsg: 'Unauthorized',
        error: data
      })
    }
  
    /**
     *
     * @param res
     * @param data
     * @returns Response
     * @description THIS FUNCTION RETURN THE CORRECT STRUCTURE TO RESPONSE FOR THE CLIENT
     */
    Forbidden (res: Response, data?: any): Response {
      return res.status(EHttpResponse.FORBIDDEN).json({
        status: EHttpResponse.FORBIDDEN,
        statusMsg: 'Forbidden',
        error: data
      })
    }
  
    /**
     *
     * @param res
     * @param data
     * @returns Response
     * @description THIS FUNCTION RETURN THE CORRECT STRUCTURE TO RESPONSE FOR THE CLIENT
     */
    Error (res: Response, data?: any): Response {
      return res.status(EHttpResponse.INTERNAL_SERVER_ERROR).json({
        status: EHttpResponse.INTERNAL_SERVER_ERROR,
        statusMsg: 'Internal server error',
        error: data
      })
    }
  
    /**
     *
     * @param res
     * @param data
     * @returns Response
     * @description THIS FUNCTION RETURN THE CORRECT STRUCTURE TO RESPONSE FOR THE CLIENT
     */
    UnprocessableEntity (res: Response, data?: any): void {
      res.status(EHttpResponse.UNPROCESSABLE_ENTITY).json({
        status: EHttpResponse.UNPROCESSABLE_ENTITY,
        statusMsg: 'Unprocessable Entity',
        error: data
      })
    }
}