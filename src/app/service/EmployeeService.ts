import { plainToClass } from "class-transformer";
import { getConnection } from "typeorm";
import { Employee } from "../entities/Employee";
import HttpException from "../exception/HttpException";
import { EmployeeRespository } from "../repository/EmployeeRespository";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken"
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import IncorrectUsernameOrPasswordException from "../exception/IncorrectUsernameOrPasswordException";
export class EmployeeService{
    constructor(private employeeRepo: EmployeeRespository) {

    }
    getAllEmployees(){
        const employeeResp = [
            // {
            //     "id": "af168383-b350-4894-8ca3-34811ffa34ac",
            //     "name": "Rahul",
            //     "joiningDate": "2021-07-15T14:48:00.000Z",
            //     "role": "dev",
            //     "experience": 1,
            //     "status": "Active",
            //     "designation": 'Associate',
            //     "employeeProofUrl": "erer",
            //     "email": "test@test.com",
            //     "password": "123456",
            //     "departments": []
            // },
            // {
            //     "id": "763a5477-c283-4724-94ce-6dc7a5688685",
            //     "name": "hawari",
            //     "joiningDate": "2020-01-08T10:53:09.506Z",
            //     "role": "dev",
            //     "experience": 5,
            //     "status": "Active",
            //     "designation": "Senior",
            //     "employeeProofUrl": "http://",
            //     "email": "test@gmail.com",
            //     "password": "teereddf",
            //     "departments": [
            //         {
            //             "id": "b4fec1fd-5921-4c0e-883c-0904c4a70bad",
            //             "name": "developers"
            //         }
            //     ]
            // }
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
                //age: employeeDetails.age,
                departmentId: employeeDetails.departmentId,
                status: employeeDetails.status,
                join_date: employeeDetails.join_date,
                experience: employeeDetails.experience
                //isActive: true,
            });
        
            const save = await this.employeeRepo.saveEmployeeDetails(newEmployee);
            return save;
        } catch (err) {
            throw err;
        }
    }

    public async updateEmployeeDetails(employeeId: string, employeeDetails: any) {
        try {
                const existEmployee = plainToClass(Employee, {
                name: employeeDetails.name,
                username: employeeDetails.username,
                passsword: employeeDetails.password ? await bcrypt.hash(employeeDetails.password, 10): '',
                role: employeeDetails.role,
                //age: employeeDetails.age,
                departmentId: employeeDetails.departmentId,
                status: employeeDetails.status,
                join_date: employeeDetails.join_date,
                experience: employeeDetails.experience
                //isActive: true,
            });
            const updateEmployeeDetails = await this.employeeRepo.updateEmployeeDetails(employeeId, existEmployee);
            return updateEmployeeDetails;
        } catch (err) {
            //throw new HttpException(400, "Failed to create employee", );
        }


    }

    
    public async softDeleteEmployeeById(employeeId: string) {
        try {
            
            //const save = await this.employeeRepo.updateEmployeeDetails(newEmployee);
            
            const softDeleteEmployeeById = await this.employeeRepo.softDeleteEmployeeById(employeeId);
            return softDeleteEmployeeById;
            //return save;
        } catch (err) {
            //throw new HttpException(400, "Failed to create employee", );
        }
    }

    public async hardDeleteEmployeeById(employeeId: string) {
        try {
            
            //const save = await this.employeeRepo.updateEmployeeDetails(newEmployee);
            
            const hardDeleteEmployeeById = await this.employeeRepo.hardDeleteEmployeeById(employeeId);
            return hardDeleteEmployeeById;
            //return save;
        } catch (err) {
            //throw new HttpException(400, "Failed to create employee", );
        }
    }

    public employeeLogin = async (
        name: string,
        password: string
      ) => {
        const employeeDetails = await this.employeeRepo.getEmployeeByName(
          name
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