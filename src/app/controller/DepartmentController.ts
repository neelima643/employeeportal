import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { DepartmentService } from "../service/DepartmentService";
import { CreateDepartmentDto } from "../dto/createDepartmentdto";
import validationMiddleware from "../middleware/validationMiddleware";
import { createUuid } from "../dto/createUuid";
import authorize from "../middleware/authorize";

class DepartmentController extends AbstractController {
  constructor(private departmentService: DepartmentService) {
    super(`${APP_CONSTANTS.apiPrefix}/department`);
    this.initializeRoutes();
  }
  
  
  protected initializeRoutes() {
    this.router.get(`${this.path}`, 

    this.departmentResponse);

    
      this.router.post(
        `${this.path}`,
        authorize(['admin', 'superAdmin', 'trainee']),
        validationMiddleware(CreateDepartmentDto, APP_CONSTANTS.body),
    
        this.createDepartment
      );

      this.router.put(
        `${this.path}/:id`,
        authorize(['admin', 'superAdmin', 'trainee']),
        validationMiddleware(createUuid, APP_CONSTANTS.params),

        validationMiddleware(CreateDepartmentDto, APP_CONSTANTS.body),

        this.updateEmployeeDetails
      );

      this.router.delete(
        `${this.path}/:id`,
        authorize(['admin', 'superAdmin', 'trainee']),
        validationMiddleware(createUuid, APP_CONSTANTS.params),

        this.softDeleteEmployeeById
      );
  
  }



  private departmentResponse = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = await this.departmentService.getAllEmployee();
      response.status(200);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }


  private createDepartment = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.departmentService.createDepartment(request.body);
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
      const data = await this.departmentService.updateDepartmentDetails(request.params.id, request.body);
      
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
      const data = await this.departmentService.softDeleteDepartmentById(request.params.id);
      
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }

}



  

export default DepartmentController;
