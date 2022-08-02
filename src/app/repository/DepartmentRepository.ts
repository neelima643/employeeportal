import { getConnection } from "typeorm";
import { Department } from "../entities/Department";

export class DepartmentRepository{
    async getAllEmployee(){
        const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.find();
    }
    
    public async saveDepartmentDetails(departmentDetails: Department) {
        const employeeRepo = getConnection().getRepository(Department);
        return employeeRepo.save(departmentDetails);
    }

    public async updateDepartmentDetails(id: string, departmentDetails: any) {
        const employeeRepo = getConnection().getRepository(Department);
        return employeeRepo.update(id, departmentDetails);
        
    }

    public async softDeleteDepartmentById(id: string) {
        const employeeRepo = getConnection().getRepository(Department);
        return employeeRepo.softDelete(id);
    }

    public async hardDeleteDepartmentById(id: string) {
        const employeeRepo = getConnection().getRepository(Department);
        return employeeRepo.delete({
            id
        });
    }
}