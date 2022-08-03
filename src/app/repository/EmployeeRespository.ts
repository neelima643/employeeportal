import { DeepPartial, getConnection } from "typeorm";
import { CreateEmployeeDto } from "../dto/createEmployee";
import {Employee} from "../entities/Employee";

export class EmployeeRespository{
    async getAllEmployees(): Promise<Employee[]>{
         const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.find();
    }

    async getEmployeeById(employeeId: string){
        const employeeRepo = getConnection().getRepository(Employee);
       return employeeRepo.findOne({where:{id:employeeId},relations:['address']});
   }

    public async saveEmployeeDetails(employeeDetails: Employee) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.save(employeeDetails);
    }

    public async updateEmployeeDetails(employeeDetails: DeepPartial<Employee>) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.save(employeeDetails);
        
    }

    public async softDeleteEmployeeById(id: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        const empdet: Employee = await this.getEmployeeById(id)
        const data = await employeeRepo.softRemove(empdet);
        return data;
    }

    public async hardDeleteEmployeeById(id: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.delete({
            id
        });
    }

    public async getEmployeeByName(userName: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        const employeeDetail = await employeeRepo.findOne({
            where: { username: userName },
        });
        return employeeDetail;
    }


    }

