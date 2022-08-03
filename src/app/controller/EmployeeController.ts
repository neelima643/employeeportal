import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { EmployeeService } from "../service/EmployeeService";
import { CreateEmployeeDto } from "../dto/createEmployee";
import validationMiddleware from "../middleware/validationMiddleware";
import authorize from "../middleware/authorize";
import { createUuid } from "../dto/createUuid";

class EmployeeController extends AbstractController {
  constructor(private employeeService: EmployeeService) {
    super(`${APP_CONSTANTS.apiPrefix}/employee`);
    this.initializeRoutes();
  }

  protected initializeRoutes() {
    this.router.get(`${this.path}`,
    authorize(['admin', 'superAdmin', 'trainee'])
    ,this.employeeResponse);

    this.router.get(`${this.path}/:id`, this.getEmployeeById);

    this.router.post(
        `${this.path}`,
        authorize(['admin', 'superAdmin', 'trainee']),

         validationMiddleware(CreateEmployeeDto, APP_CONSTANTS.body),
        
        this.createEmployee
      );

      this.router.put(
        `${this.path}/:id`,
        authorize(['admin', 'superAdmin', 'trainee']),

        validationMiddleware(createUuid, APP_CONSTANTS.params),

        validationMiddleware(CreateEmployeeDto, APP_CONSTANTS.body),
        
        this.updateEmployeeDetails
      );

      this.router.delete(
        `${this.path}/:id`,
        authorize(['admin', 'superAdmin', 'trainee']),

        validationMiddleware(createUuid, APP_CONSTANTS.params),
       
        this.softDeleteEmployeeById
      );

      this.router.post(
        `${this.path}/login`,
        
        this.login
      );
      
  
  }
  private employeeResponse = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
        
      const data: any = await this.employeeService.getAllEmployees();
      response.status(200);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }

  
  private getEmployeeById = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    
    try {
      const data = await this.employeeService.getEmployeeById(request.params.id);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }
  
  private createEmployee = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    
    try {
      const data = await this.employeeService.createEmployee(request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }

  private updateEmployeeDetails = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.employeeService.updateEmployeeDetails(request.params.id, request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }

  private softDeleteEmployeeById = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.employeeService.softDeleteEmployeeById(request.params.id);
      
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }

 

  
  private login = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const loginData = request.body;
    try {
        const loginDetail = await this.employeeService.employeeLogin(
            loginData.username,
            loginData.password
          );
          response.send(
            this.fmt.formatResponse(loginDetail, Date.now() - request.startTime, "OK")
          );
    } catch (err) {
        return next(err)
    }
  };
}

export default EmployeeController;
