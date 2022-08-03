import { getConnection } from "typeorm";
import {Employee} from "../entities/Employee";

export class EmployeeRespository{
    async getAllEmployees(){
         const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.find();
    }

    async getEmployeeById(employeeId: string){
        const employeeRepo = getConnection().getRepository(Employee);
       return employeeRepo.find({where:{id:employeeId},relations:['department']});
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
        const empdet = this.getEmployeeById(id)
        return employeeRepo.softRemove({id, empdet});
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

