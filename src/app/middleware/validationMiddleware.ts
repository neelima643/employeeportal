import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Request } from "express";
import * as express from "express";
import HttpException from "../exception/HttpException";
import APP_CONSTANTS from "../constants";
import { ErrorCodes } from "../util/errorCode";
import { request } from "http";


/**
 * Middleware to validate the request.
 * Validations are performed using class validator
 */
function validationMiddleware<T>(type: any, parameter: string, skipMissingProperties = false): express.RequestHandler {
  return (req, res, next) => {

      let reqstruct;
 

      if(parameter == APP_CONSTANTS.body) {
        reqstruct = req.body;
      }
      else if(parameter == APP_CONSTANTS.params) {
          reqstruct = req.params;
      }
      
    const requestBody = plainToClass(type, reqstruct);
    validate(
      requestBody, { skipMissingProperties, forbidUnknownValues: true, whitelist: true })
      .then((errors: ValidationError[]) => {
        
        if (errors.length > 0) {
          const errorDetail = ErrorCodes.VALIDATION_ERROR;
     
          next(new HttpException(400, errorDetail.MESSAGE, errorDetail.CODE, errors))
        } else {
           if(parameter === 'body') {
            req.body = requestBody;

           }
          next();
        }
      });
  };
}
export default validationMiddleware;