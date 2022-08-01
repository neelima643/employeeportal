/**
 * Wraps Controllers for easy import from other modules
 */
import HealthController from "./HealthController";
import EmployeeController from "./EmployeeController";
import { EmployeeService } from "../service/EmployeeService";
import { EmployeeRespository } from "../repository/EmployeeRespository";
export default [
  new HealthController(),
  new EmployeeController(new EmployeeService(new EmployeeRespository())),
];
