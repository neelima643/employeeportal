import { plainToClass } from "class-transformer";
import { getConnection } from "typeorm";
import { Employee } from "../entities/Employee";
import HttpException from "../exception/HttpException";
import { EmployeeRespository } from "../repository/EmployeeRespository";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken"
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import IncorrectUsernameOrPasswordException from "../exception/IncorrectUsernameOrPasswordException";
import { ErrorCodes } from "../util/errorCode";
export class EmployeeService{
    constructor(private employeeRepo: EmployeeRespository) {

    }
    getAllEmployees(){
        const employeeResp = [
            
        ]
        return this.employeeRepo.getAllEmployees();
    }

    public async getEmployeeById(employeeId: string) {
        
        const emp = await this.employeeRepo.getEmployeeById(
            employeeId
          );
        return this.employeeRepo.getEmployeeById(employeeId);
    }

    public async createEmployee(employeeDetails: any) {

        try {
            const newEmployee = plainToClass(Employee, {
                name: employeeDetails.name,
                username: employeeDetails.username,
                passsword: employeeDetails.password ? await bcrypt.hash(employeeDetails.password, 10): '',
                role: employeeDetails.role,
                departmentId: employeeDetails.departmentId,
                status: employeeDetails.status,
                join_date: employeeDetails.join_date,
                experience: employeeDetails.experience
            });
        
            const save = await this.employeeRepo.saveEmployeeDetails(newEmployee);
            return save;
        } catch (err) {
            throw new HttpException(400, ErrorCodes.REQUEST_FAILED.CODE, ErrorCodes.REQUEST_FAILED.MESSAGE );
        }
    }

    public async updateEmployeeDetails(employeeId: string, employeeDetails: any) {
        try {
                const existEmployee = plainToClass(Employee, {
                name: employeeDetails.name,
                username: employeeDetails.username,
                passsword: employeeDetails.password ? await bcrypt.hash(employeeDetails.password, 10): '',
                role: employeeDetails.role,
                departmentId: employeeDetails.departmentId,
                status: employeeDetails.status,
                join_date: employeeDetails.join_date,
                experience: employeeDetails.experience
            });
            const updateEmployeeDetails = await this.employeeRepo.updateEmployeeDetails(employeeId, existEmployee);
            return updateEmployeeDetails;
        } catch (err) {
            throw new HttpException(400, ErrorCodes.USER_NOT_FOUND.CODE, ErrorCodes.USER_NOT_FOUND.MESSAGE );
        }


    }

    
    public async softDeleteEmployeeById(employeeId: string) {
        try {
            
            
            
            const softDeleteEmployeeById = await this.employeeRepo.softDeleteEmployeeById(employeeId);
            return softDeleteEmployeeById;
            
        } catch (err) {
            throw new HttpException(400, ErrorCodes.USER_NOT_FOUND.CODE, ErrorCodes.USER_NOT_FOUND.MESSAGE );
        }
    }

    public async hardDeleteEmployeeById(employeeId: string) {
        try {
            
            
            
            const hardDeleteEmployeeById = await this.employeeRepo.hardDeleteEmployeeById(employeeId);
            return hardDeleteEmployeeById;
            
        } catch (err) {
            throw new HttpException(400, ErrorCodes.USER_NOT_FOUND.CODE, ErrorCodes.USER_NOT_FOUND.MESSAGE );
        }
    }

    public employeeLogin = async (
        username: string,
        password: string
      ) => {
        const employeeDetails = await this.employeeRepo.getEmployeeByName(
          username
        );

        
        if (!employeeDetails) {
          throw new UserNotAuthorizedException();
        }
        const validPassword = await bcrypt.compare(password, employeeDetails.passsword);
        if (validPassword) {
          let payload = {
            "custom:id": employeeDetails.id,
            "custom:name": employeeDetails.name,
            "role": employeeDetails.role
          };
          
          const token = this.generateAuthTokens(payload);

          return {
            idToken: token,
            employeeDetails,
          };
        } else {
          throw new IncorrectUsernameOrPasswordException();
        }
      };

     private generateAuthTokens = (payload: any) => {
        return jsonwebtoken.sign(payload, process.env.JWT_TOKEN_SECRET, {
          expiresIn: process.env.ID_TOKEN_VALIDITY,
        });
      };  



    }