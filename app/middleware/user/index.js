const { Helper, ApiError, constants } = require("../../utils");
const db = require("../../sql");

const { UserService } = require("../../services");
const { findUserByEmail, findUserById, fetchUsers } = UserService;
const { errorResponse } = Helper;
const { EMAIL_CONFLICT, USER_NOT_FOUND, USER_SIGNUP_ERROR } = constants;

/**
 * A collection for middleware methods for user
 * @class UserMiddleware
 */
class UserMiddleware {
  /**
   * Validates user unique credentials { Email }
   * @static
   * @param { Object } req - The request from the endpoint
   * @param { Object } res - The response returned by the method.
   * @param { Object } next - calls the next handle
   * @memberof UserMiddleware
   * @returns {JSON || Null } - Returns error response if validation fails or Null if otherwise.
   */
  static async validateUserEmail(req, res, next) {
    try {
      const data = await findUserByEmail(req.body.email);
      const user = Helper.checkEmptyArray(data);
      return user
        ? errorResponse(
            req,
            res,
            new ApiError({ status: 409, message: EMAIL_CONFLICT }),
          )
        : next();
    } catch (e) {
      Helper.moduleErrLogMessager(e);
      next(new ApiError({ message: USER_SIGNUP_ERROR }));
    }
  }

  /**
   *Fetche user by Id
   * @static
   * @param { Object } req - The request from the endpoint
   * @param { Object } res - The response returned by the method.
   * @param { Object } next - calls the next handle
   * @memberof UserMiddleware
   * @returns {JSON || Null } - Returns error response if validation fails or Null if otherwise.
   */
  static async fetchUserById(req, res, next) {
    const { id } = req.params;

    const data = await findUserById(id);
    const user = Helper.checkEmptyArray(data);

    req.user = user;

    user
      ? next()
      : errorResponse(
          req,
          res,
          new ApiError({
            status: 404,
            message: USER_NOT_FOUND,
          }),
        );
  }

  static async fetchAllUsers(req, res, next) {
    try {
      const data = await fetchUsers();
      req.user = data;

      req.users
        ? next()
        : errorResponse(
            req,
            res,
            new ApiError({ status: 404, message: USER_NOT_FOUND }),
          );
    } catch (e) {
      Helper.moduleErrLogMessager(e);
      next(new ApiError({ message: e.message }));
    }
  }
}

module.exports = UserMiddleware;
