import { getConnection } from "typeorm";
import {Employee} from "../entities/Employee";

export class EmployeeRespository{
    async getAllEmployees(){
         const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.find();
    }

    async getEmployeeById(employeeId: string){
        const employeeRepo = getConnection().getRepository(Employee);
       return employeeRepo.find({id: employeeId});
   }

    public async saveEmployeeDetails(employeeDetails: Employee) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.save(employeeDetails);
    }

    public async updateEmployeeDetails(employeeId: string, employeeDetails: any) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.update({ id: employeeId, deletedAt: null }, employeeDetails);
        
    }

    public async softDeleteEmployeeById(id: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.softDelete(id);
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
            where: { name: userName },
        });
        return employeeDetail;
    }


    }

