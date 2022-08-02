import { plainToClass } from "class-transformer";
import { Department } from "../entities/Department";
import HttpException from "../exception/HttpException";
import { DepartmentRepository } from "../repository/DepartmentRepository";

export class DepartmentService{
    constructor(private departmentRepo: DepartmentRepository) {

    }
    getAllEmployee(){
        const departmentResp = [
            {
                "id": "af168383-b350-4894-8ca3-34811ffa34ac",
                "name": "Rahul",
                "joiningDate": "2021-07-15T14:48:00.000Z",
                "role": "dev",
                "experience": 1,
                "status": "Active",
                "designation": 'Associate',
                "employeeProofUrl": "erer",
                "email": "test@test.com",
                "password": "123456",
                "departments": []
            },
            {
                "id": "763a5477-c283-4724-94ce-6dc7a5688685",
                "name": "hawari",
                "joiningDate": "2020-01-08T10:53:09.506Z",
                "role": "dev",
                "experience": 5,
                "status": "Active",
                "designation": "Senior",
                "employeeProofUrl": "http://",
                "email": "test@gmail.com",
                "password": "teereddf",
                "departments": [
                    {
                        "id": "b4fec1fd-5921-4c0e-883c-0904c4a70bad",
                        "name": "developers"
                    }
                ]
            }
        ]
        return this.departmentRepo.getAllEmployee();
    }

    public async createDepartment(departmentDetails: any) {
        try {
            const newDepartment = plainToClass(Department, {
                name: departmentDetails.name,
                //username: employeeDetails.username,
                //age: employeeDetails.age,
                //departmentId: departmentDetails.departmentId,
                deptHead: departmentDetails.deptHead
                //isActive: true,
            });
            const save = await this.departmentRepo.saveDepartmentDetails(newDepartment);
            return save;
        } catch (err) {
            //throw new HttpException(400, "Failed to create employee", );
        }
    }

    public async updateDepartmentDetails(departmentId: string, departmentDetails: any) {
        try {
            const existDepartment = plainToClass(Department, {
                name: departmentDetails.name,
                //username: employeeDetails.username,
                //age: employeeDetails.age,
                //departmentId: departmentDetails.departmentId,
                deptHead: departmentDetails.deptHead
                //isActive: true,
            });
            const updates = await this.departmentRepo.updateDepartmentDetails(departmentId, existDepartment);
            return updates;
        } catch (err) {
            //throw new HttpException(400, "Failed to create employee", );
        }
    }

    public async softDeleteDepartmentById(departmentId: string) {
        try {
            
            //const save = await this.employeeRepo.updateEmployeeDetails(newEmployee);
            
            const softDeletes = await this.departmentRepo.softDeleteDepartmentById(departmentId);
            return softDeletes;
            //return save;
        } catch (err) {
            //throw new HttpException(400, "Failed to create employee", );
        }
    }
    
    
    }