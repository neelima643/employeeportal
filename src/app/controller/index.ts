/**
 * Wraps Controllers for easy import from other modules
 */
import HealthController from "./HealthController";
import EmployeeController from "./EmployeeController";
import { EmployeeService } from "../service/EmployeeService";
import { EmployeeRespository } from "../repository/EmployeeRespository";
import DepartmentController from "./DepartmentController";
import { DepartmentService } from "../service/DepartmentService";
import { DepartmentRepository } from "../repository/DepartmentRepository";
export default [
  new HealthController(),
  new EmployeeController(new EmployeeService(new EmployeeRespository())),
  new DepartmentController(new DepartmentService(new DepartmentRepository()))
];
