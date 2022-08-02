import HttpException from "./HttpException";
import { CustomError, ErrorCodes } from "../util/errorCode";

/**
 * This exception can use used in case an entity is not found.
 */
class IncorrectUsernameOrPasswordException extends HttpException {

  constructor() {
    super(401, ErrorCodes.UNAUTHORIZED.MESSAGE, ErrorCodes.UNAUTHORIZED.CODE);
  }
}

export default IncorrectUsernameOrPasswordException;
