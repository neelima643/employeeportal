import { plainToClass } from "class-transformer";
import { Department } from "../entities/Department";
import HttpException from "../exception/HttpException";
import IncorrectUsernameOrPasswordException from "../exception/IncorrectUsernameOrPasswordException";
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import { DepartmentRepository } from "../repository/DepartmentRepository";
import { ErrorCodes } from "../util/errorCode";
import jsonwebtoken from "jsonwebtoken"


export class DepartmentService{
    constructor(private departmentRepo: DepartmentRepository) {

    }
    getAllDepartment(){
        const departmentResp = [
            
        ]
        return this.departmentRepo.getAllDepartment();
    }

    public async createDepartment(departmentDetails: any) {
        try {
            const newDepartment = plainToClass(Department, {
                name: departmentDetails.name,
                deptHead: departmentDetails.deptHead
            });
            const save = await this.departmentRepo.saveDepartmentDetails(newDepartment);
            return save;
        } 
        catch (err) {
            throw new HttpException(400, ErrorCodes.REQUEST_FAILED.CODE, ErrorCodes.REQUEST_FAILED.MESSAGE );
        }
    }

    public async updateDepartmentDetails(departmentId: string, departmentDetails: any) {
        try {
            const existDepartment = plainToClass(Department, {
                name: departmentDetails.name,
                
                deptHead: departmentDetails.deptHead
               
            });
            const updates = await this.departmentRepo.updateDepartmentDetails(departmentId, existDepartment);
            return updates;
        } catch (err) {
            throw new HttpException(400, ErrorCodes.USER_NOT_FOUND.CODE, ErrorCodes.USER_NOT_FOUND.MESSAGE );
        }
    }

    public async softDeleteDepartmentById(departmentId: string) {
        try {
            
            const softDeletes = await this.departmentRepo.softDeleteDepartmentById(departmentId);
            return softDeletes;
        } catch (err) {
            throw new HttpException(400, ErrorCodes.USER_NOT_FOUND.CODE, ErrorCodes.USER_NOT_FOUND.MESSAGE );
        }
    }
    
    
    }